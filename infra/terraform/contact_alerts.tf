# Email alerts for contact-form messages.
#
# The contact Lambda stores every message in DynamoDB and then emails it to
# every address in var.contact_alert_to through SES, with the visitor's address
# as Reply-To so recipients can answer straight from their inbox. Before this
# existed, messages sat in the table with nobody told.
#
# Mail for the domain is hosted on Microsoft 365 (see the MX and SPF records in
# main.tf). SES only needs to be able to *send* as the domain, so none of those
# records change:
#   - DKIM (three CNAMEs) verifies the domain in SES and signs every alert, which
#     is what lets Microsoft 365 trust mail claiming to be from its own domain.
#   - A custom MAIL FROM subdomain gives SES its own SPF record, so the apex SPF
#     (and its -all) stays exactly as Microsoft 365 needs it.

variable "contact_alert_to" {
  type        = list(string)
  description = "Inboxes that receive an email for every contact-form message"
  default = [
    "jesse@jesseforeman.com",
    # Temporary: Rob's inbox while the alerts are being tested. Remove once
    # Jesse confirms he is receiving them.
    "rob.j.len@gmail.com",
  ]
}

locals {
  contact_alerts_enabled = var.enable_custom_domain
  contact_alert_from     = "Jesse Foreman <notifications@${var.domain_name}>"
  ses_mail_from_domain   = "mail.${var.domain_name}"
}

resource "aws_sesv2_email_identity" "site" {
  count          = local.contact_alerts_enabled ? 1 : 0
  email_identity = var.domain_name
  tags           = var.tags

  dkim_signing_attributes {
    next_signing_key_length = "RSA_2048_BIT"
  }
}

resource "aws_route53_record" "ses_dkim" {
  count   = local.contact_alerts_enabled ? 3 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = "${aws_sesv2_email_identity.site[0].dkim_signing_attributes[0].tokens[count.index]}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_sesv2_email_identity.site[0].dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
}

resource "aws_sesv2_email_identity_mail_from_attributes" "site" {
  count          = local.contact_alerts_enabled ? 1 : 0
  email_identity = aws_sesv2_email_identity.site[0].email_identity

  mail_from_domain = local.ses_mail_from_domain
  # Until the records below resolve, fall back to amazonses.com rather than
  # refusing to send.
  behavior_on_mx_failure = "USE_DEFAULT_VALUE"
}

resource "aws_route53_record" "ses_mail_from_mx" {
  count   = local.contact_alerts_enabled ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = local.ses_mail_from_domain
  type    = "MX"
  ttl     = 600
  records = ["10 feedback-smtp.${var.aws_region}.amazonses.com"]
}

resource "aws_route53_record" "ses_mail_from_spf" {
  count   = local.contact_alerts_enabled ? 1 : 0
  zone_id = aws_route53_zone.primary[0].zone_id
  name    = local.ses_mail_from_domain
  type    = "TXT"
  ttl     = 600
  records = ["v=spf1 include:amazonses.com -all"]
}

resource "aws_iam_role_policy" "contact_lambda_ses" {
  count = local.contact_alerts_enabled ? 1 : 0
  name  = "${var.project_name}-contact-lambda-ses"
  role  = aws_iam_role.contact_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["ses:SendEmail"]
        Resource = aws_sesv2_email_identity.site[0].arn
        Condition = {
          StringEquals = {
            "ses:FromAddress" = "notifications@${var.domain_name}"
          }
        }
      },
    ]
  })
}
