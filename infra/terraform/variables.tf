variable "project_name" {
  type        = string
  description = "Prefix used for naming AWS resources"
  default     = "jf-com"
}

variable "domain_name" {
  type        = string
  description = "Apex domain for the site (used when enable_custom_domain=true)"
  default     = "jesseforeman.com"
}

variable "enable_custom_domain" {
  type        = bool
  description = "When false, uses the default CloudFront hostname (no Route53/ACM required)."
  default     = true
}

variable "aws_region" {
  type        = string
  description = "Region for regional resources"
  default     = "us-east-1"
}

variable "github_repository" {
  type        = string
  description = "GitHub repository in owner/repo form used to scope OIDC (e.g. org/jf-com)"
  default     = "lenhofr/jf-com"
}

variable "tags" {
  type        = map(string)
  description = "Tags applied to supported resources"
  default     = {}
}
