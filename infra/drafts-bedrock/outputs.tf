output "drafts_role_arn" {
  description = "Set as GitHub secret AWS_DRAFTS_ROLE_ARN on lenhofr/jf-com"
  value       = aws_iam_role.drafts.arn
}

output "drafts_inference_profile_arn" {
  description = "Set as repository variable DRAFT_INFERENCE_PROFILE_ARN on lenhofr/jf-com"
  value       = aws_bedrock_inference_profile.drafts.arn
}
