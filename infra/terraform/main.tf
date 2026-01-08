locals {
  site_aliases = var.enable_custom_domain ? [
    var.domain_name,
    "www.${var.domain_name}",
  ] : []

  # Common Microsoft 365 MX hostname pattern.
  m365_mx_host = "${replace(var.domain_name, ".", "-")}.mail.protection.outlook.com"
}

resource "random_id" "bucket_suffix" {
  byte_length = 4

  keepers = {
    domain = var.domain_name
    region = var.aws_region
  }
}

resource "aws_s3_bucket" "site" {
  bucket = lower("${var.project_name}-site-${random_id.bucket_suffix.hex}")
  tags   = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-site-oac"
  description                       = "OAC for ${var.project_name} site bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "Managed-CachingDisabled"
}

# GitHub Actions OIDC (for aws-actions/configure-aws-credentials)
data "tls_certificate" "github_actions" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github_actions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github_actions.certificates[0].sha1_fingerprint]
}

resource "aws_iam_role" "github_actions_deploy" {
  name = "${var.project_name}-github-actions-deploy"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repository}:*"
          }
        }
      },
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "github_actions_admin" {
  role       = aws_iam_role.github_actions_deploy.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_route53_zone" "primary" {
  count = var.enable_custom_domain ? 1 : 0

  name = var.domain_name
  tags = var.tags
}

# Email DNS (Microsoft 365 via GoDaddy)
resource "aws_route53_record" "spf" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = var.domain_name
  type    = "TXT"
  ttl     = 300

  # Keep secureserver.net for GoDaddy sending services; add Outlook for Microsoft 365.
  records = ["v=spf1 include:secureserver.net include:spf.protection.outlook.com -all"]
}

resource "aws_route53_record" "mx" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = var.domain_name
  type    = "MX"
  ttl     = 300
  records = ["0 ${local.m365_mx_host}"]
}

resource "aws_route53_record" "autodiscover" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = "autodiscover.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = ["autodiscover.outlook.com"]
}

resource "aws_acm_certificate" "site" {
  count                     = var.enable_custom_domain ? 1 : 0
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"
  tags                      = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = var.enable_custom_domain ? {
    for dvo in aws_acm_certificate.site[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  zone_id = aws_route53_zone.primary[0].zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "site" {
  count                   = var.enable_custom_domain ? 1 : 0
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site[0].arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = local.site_aliases

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-site"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-site"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]

    cache_policy_id = data.aws_cloudfront_cache_policy.caching_disabled.id
  }

  # Vite emits hashed assets under /assets; cache those aggressively.
  ordered_cache_behavior {
    path_pattern           = "assets/*"
    target_origin_id       = "s3-site"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]

    cache_policy_id = data.aws_cloudfront_cache_policy.caching_optimized.id
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.enable_custom_domain ? false : true

    acm_certificate_arn      = var.enable_custom_domain ? aws_acm_certificate_validation.site[0].certificate_arn : null
    ssl_support_method       = var.enable_custom_domain ? "sni-only" : null
    minimum_protocol_version = var.enable_custom_domain ? "TLSv1.2_2021" : null
  }

  tags = var.tags
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServiceRead"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = ["s3:GetObject"]
        Resource = ["${aws_s3_bucket.site.arn}/*"]
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
          }
        }
      },
    ]
  })
}


resource "aws_route53_record" "apex_a" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex_aaaa" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_a" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_aaaa" {
  count   = var.enable_custom_domain ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
