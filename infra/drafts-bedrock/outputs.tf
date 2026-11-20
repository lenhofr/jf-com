output "drafts_role_arn" {
  description = "Set as GitHub secret AWS_DRAFTS_ROLE_ARN on lenhofr/jf-com"
  value       = aws_iam_role.drafts.arn
}
