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

variable "bedrock_inference_profiles" {
  type        = list(string)
  description = <<-EOT
    Bedrock inference profiles draft-posts.yml may call. DRAFT_MODEL_ID in the
    workflow must be one of these. Opus 5.5 is listed so it can be switched to
    with DRAFT_MODEL_ID alone; it works only once the account has a
    Marketplace subscription to it (see README.md).
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

variable "drafts_profile_source" {
  type        = string
  description = <<-EOT
    The us.* system inference profile the jf-com-drafts application inference
    profile copies. Must match the workflow's DRAFT_MODEL_ID. Changing it
    replaces the profile, so its ARN (DRAFT_INFERENCE_PROFILE_ARN) changes too.
  EOT
  default     = "us.anthropic.claude-sonnet-4-6"
}
