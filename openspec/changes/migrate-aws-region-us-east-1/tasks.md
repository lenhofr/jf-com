## 1. Proposal decisions
- [x] 1.1 Confirm target region: us-east-1
- [x] 1.2 Confirm migration strategy: parallel create + cutover + retire us-west-2
- [x] 1.3 Confirm acceptable downtime: aim for zero-downtime (CloudFront continues serving)

## 2. Terraform changes
- [x] 2.1 Update `var.aws_region` default to `us-east-1`
- [x] 2.2 Update `infra/terraform/bootstrap` provider region to `us-east-1`
- [x] 2.3 Ensure any globally-unique resources (notably the site S3 bucket name) can be created in parallel in the new region (e.g., incorporate region into naming/keepers)

## 3. Migration execution
- [x] 3.1 Inventory current regional resources in us-west-2 (S3 site bucket, Lambda/APIGW/DynamoDB, etc.)
- [x] 3.2 Create new us-east-1 resources via Terraform without destroying the us-west-2 stack
- [x] 3.3 Migrate data where applicable (e.g., copy site assets from old bucket to new)
- [x] 3.4 Cut over CloudFront origin / endpoints to us-east-1 resources
- [x] 3.5 Verify production smoke tests
- [x] 3.6 Decommission us-west-2 resources once stable

## 4. Quality gates
- [x] 4.1 Run `terraform fmt -recursive`
- [x] 4.2 Run `terraform validate`
- [x] 4.3 Run `terraform plan` and review destroys/creates carefully
