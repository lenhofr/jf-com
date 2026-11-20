terraform {
  required_version = ">= 1.6.0"

  # The account's shared state bucket. infra/terraform uses key jf-com/; this
  # root has its own key so the two states never touch.
  backend "s3" {
    bucket  = "tf-state-common-217354297026-us-east-1"
    key     = "jf-com-drafts/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  # Refuse to run against any other account (in particular the old rjl-ai-dev
  # account, 923988301699), so the wrong profile fails at plan.
  allowed_account_ids = ["217354297026"]

  default_tags {
    tags = {
      ManagedBy = "terraform"
      site      = "jf-com"
    }
  }
}
