variable "aws_region" {
  type        = string
  description = "Region for the IAM calls; IAM itself is global"
  default     = "us-east-1"
}

variable "github_repository" {
  type        = string
  description = "GitHub repository in owner/repo form allowed to assume the drafts role"
  default     = "lenhofr/jf-com"
}

variable "create_github_oidc_provider" {
  type        = bool
  description = <<-EOT
    AWS allows one token.actions.githubusercontent.com provider per account.
    True creates it here. If another root already owns it, set false and this
    looks the existing one up instead.
  EOT
  default     = true
}

variable "bedrock_inference_profiles" {
  type        = list(string)
  description = <<-EOT
    Bedrock inference profiles draft-posts.yml may call. DRAFT_MODEL_ID in the
    workflow must be one of these. Opus 5.5 is listed for when the account can
    subscribe to it again; until then calls to it fail with AccessDenied.
  EOT
  default = [
    "us.anthropic.claude-sonnet-4-6",
    "us.anthropic.claude-opus-5-5",
  ]
}

variable "bedrock_profile_regions" {
  type        = list(string)
  description = "Regions the us.* inference profiles route to (aws bedrock list-inference-profiles)"
  default     = ["us-east-1", "us-east-2", "us-west-2"]
}
