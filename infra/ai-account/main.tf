# Lets .github/workflows/draft-posts.yml call models on Amazon Bedrock in the
# rjl-ai-dev account (923988301699), with no long-lived keys.
#
# GitHub Actions authenticates here directly over OIDC. There is no hop through
# the jf-com account: that account's only GitHub role is AdministratorAccess,
# and trusting it from here would be a weaker boundary than trusting the repo's
# main branch.
#
# Applied by hand with rjl-ai-dev credentials; jf-com's CI cannot reach this
# account. See README.md.

data "aws_caller_identity" "current" {}

data "tls_certificate" "github_actions" {
  count = var.create_github_oidc_provider ? 1 : 0
  url   = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github_actions" {
  count = var.create_github_oidc_provider ? 1 : 0

  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github_actions[0].certificates[0].sha1_fingerprint]
}

data "aws_iam_openid_connect_provider" "github_actions" {
  count = var.create_github_oidc_provider ? 0 : 1
  url   = "https://token.actions.githubusercontent.com"
}

locals {
  github_oidc_provider_arn = (
    var.create_github_oidc_provider
    ? aws_iam_openid_connect_provider.github_actions[0].arn
    : data.aws_iam_openid_connect_provider.github_actions[0].arn
  )
}

resource "aws_iam_role" "drafts" {
  name = "jf-com-drafts"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = local.github_oidc_provider_arn
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

resource "aws_iam_role_policy" "drafts_inference" {
  name = "bedrock-inference"
  role = aws_iam_role.drafts.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "bedrock:InvokeModel"
        Resource = concat(local.inference_profile_arns, local.foundation_model_arns)
      },
    ]
  })
}
