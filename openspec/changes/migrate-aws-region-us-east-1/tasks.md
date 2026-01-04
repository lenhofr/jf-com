## 1. Proposal decisions
- [ ] 1.1 Confirm target region: us-east-1
- [ ] 1.2 Confirm migration strategy: parallel create + cutover + retire us-west-2
- [ ] 1.3 Confirm acceptable downtime: aim for zero-downtime (CloudFront continues serving)

## 2. Terraform changes
- [ ] 2.1 Update `var.aws_region` default to `us-east-1`
- [ ] 2.2 Update `infra/terraform/bootstrap` provider region to `us-east-1`
- [ ] 2.3 Ensure any globally-unique resources (notably the site S3 bucket name) can be created in parallel in the new region (e.g., incorporate region into naming/keepers)

## 3. Migration execution
- [ ] 3.1 Inventory current regional resources in us-west-2 (S3 site bucket, Lambda/APIGW/DynamoDB, etc.)
- [ ] 3.2 Create new us-east-1 resources via Terraform without destroying the us-west-2 stack
- [ ] 3.3 Migrate data where applicable (e.g., copy site assets from old bucket to new)
- [ ] 3.4 Cut over CloudFront origin / endpoints to us-east-1 resources
- [ ] 3.5 Verify production smoke tests
- [ ] 3.6 Decommission us-west-2 resources once stable

## 4. Quality gates
- [ ] 4.1 Run `terraform fmt -recursive`
- [ ] 4.2 Run `terraform validate`
- [ ] 4.3 Run `terraform plan` and review destroys/creates carefully
