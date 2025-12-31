terraform {
  required_version = ">= 1.6.0"

  backend "s3" {
    bucket  = "tf-state-common-217354297026-us-east-1"
    key     = "jf-com/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }
}
