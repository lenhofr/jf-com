# Lets .github/workflows/draft-posts.yml call models on Amazon Bedrock in
# account 217354297026 (the same account as the site infrastructure), with no
# long-lived keys.
#
# The drafts get their own narrowly scoped role rather than reusing the site's
# deploy role (AdministratorAccess, any ref of the repo): this one can only be
# assumed from main and can only call bedrock:InvokeModel.
#
# Kept as its own root, separate from infra/terraform, so the deploy pipeline
# never plans or applies it. Applied by hand; see README.md.

data "aws_caller_identity" "current" {}

# AWS allows one token.actions.githubusercontent.com provider per account, and
# in this account infra/terraform (the site root) owns it. Look it up rather
# than manage it twice.
data "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_role" "drafts" {
  name = "jf-com-drafts"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = data.aws_iam_openid_connect_provider.github_actions.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
            # Scheduled and manual runs both execute on main. Pull request runs,
            # and any other branch, cannot assume this role.
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repository}:ref:refs/heads/main"
          }
        }
      },
    ]
  })
}

# Cross-region inference profiles (us.*) route each request to the model in one
# of several regions, so the role needs the profile and the model in every
# region the profile can pick. bedrock:InvokeModel also covers Converse.
#
# No Marketplace permissions: the account's subscription to each model must
# already exist (see README.md). Without them a first call cannot create one by
# accident from CI.
locals {
  inference_profile_arns = [
    for id in var.bedrock_inference_profiles :
    "arn:aws:bedrock:${var.aws_region}:${data.aws_caller_identity.current.account_id}:inference-profile/${id}"
  ]
  foundation_model_arns = flatten([
    for id in var.bedrock_inference_profiles : [
      for region in var.bedrock_profile_regions :
      "arn:aws:bedrock:${region}::foundation-model/${replace(id, "/^(us|global)\\./", "")}"
    ]
  ])
}

# An application inference profile for the drafts, so Bedrock spend can be
# filtered by the app tag in Cost Explorer (after activating "app" as a cost
# allocation tag in Billing). Copying a us.* system profile keeps its
# cross-region routing. The workflow calls this ARN
# (DRAFT_INFERENCE_PROFILE_ARN); it must stay in step with DRAFT_MODEL_ID.
resource "aws_bedrock_inference_profile" "drafts" {
  name        = "jf-com-drafts"
  description = "jf-com AI blog drafts from draft-posts.yml"

  model_source {
    copy_from = "arn:aws:bedrock:${var.aws_region}:${data.aws_caller_identity.current.account_id}:inference-profile/${var.drafts_profile_source}"
  }

  tags = {
    app = "jf-com-drafts"
  }

  lifecycle {
    precondition {
      condition     = contains(var.bedrock_inference_profiles, var.drafts_profile_source)
      error_message = "drafts_profile_source must be one of bedrock_inference_profiles."
    }
  }
}

resource "aws_iam_role_policy" "drafts_inference" {
  name = "bedrock-inference"
  role = aws_iam_role.drafts.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "bedrock:InvokeModel"
        Resource = concat(
          [aws_bedrock_inference_profile.drafts.arn],
          local.inference_profile_arns,
          local.foundation_model_arns,
        )
      },
    ]
  })
}
