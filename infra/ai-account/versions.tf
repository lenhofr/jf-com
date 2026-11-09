terraform {
  required_version = ">= 1.6.0"

  # The rjl-ai-dev account's state bucket, shared with mbm-ui's ai_account root
  # (key mbm-bedrock/). Separate key, separate state.
  backend "s3" {
    bucket  = "tf-state-923988301699-us-east-1"
    key     = "jf-com-drafts/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  # Refuse to run against any other account, so applying with the wrong
  # profile fails at plan instead of creating a role in the jf-com account.
  allowed_account_ids = ["923988301699"]

  default_tags {
    tags = {
      ManagedBy = "terraform"
      site      = "jf-com"
    }
  }
}
