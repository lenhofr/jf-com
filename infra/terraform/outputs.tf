output "route53_nameservers" {
  description = "Set these nameservers at GoDaddy to delegate DNS to Route 53 (only when enable_custom_domain=true)"
  value       = var.enable_custom_domain ? aws_route53_zone.primary[0].name_servers : []
}

output "site_bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "github_actions_role_arn" {
  description = "IAM role ARN for GitHub Actions OIDC (set this as GitHub secret AWS_ROLE_ARN)"
  value       = aws_iam_role.github_actions_deploy.arn
}
