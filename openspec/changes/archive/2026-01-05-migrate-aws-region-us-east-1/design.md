## Context
The root Terraform module currently deploys regional AWS resources using `var.aws_region` (default: `us-west-2`). Some resources are global (e.g., CloudFront) and some are region-specific (e.g., S3 bucket location, Lambda, API Gateway, DynamoDB).

## Goals / Non-Goals
- Goals:
  - Move all Terraform-managed **regional** resources to **us-east-1**.
  - Keep the site available throughout the migration.
  - Keep rollback feasible during cutover.
- Non-Goals:
  - Multi-region deployments.
  - Architecture changes beyond region selection.

## Decisions
### Decision: Target region
All regional resources SHALL be deployed to **us-east-1**.

### Decision: Migration approach
Prefer **parallel create + cutover + retire**:
1. Adjust naming where needed so us-east-1 resources can be created while us-west-2 resources still exist.
2. Apply Terraform to create the us-east-1 stack.
3. Migrate data (notably the static site S3 contents) to the new bucket.
4. Cut over CloudFront origin / any API base URLs to the us-east-1 stack.
5. After verification, remove/retire the us-west-2 resources.

### Decision: S3 bucket naming
Because S3 bucket names are globally unique and bucket location cannot be changed in-place, the us-east-1 site bucket MUST be a **new bucket name** (e.g., include the region in the random-id keepers or in the bucket name).

## Risks / Trade-offs
- Terraform plans may show large destroy/create diffs; extra care is required.
- Any manual references to region-specific endpoints (API URLs) must be updated.

## Migration Plan (high level)
- Run `terraform plan` to understand which resources will be replaced.
- Create new us-east-1 resources in parallel.
- Sync/copy site content to the new bucket.
- Cut over CloudFront origin and validate.
- Decommission the us-west-2 stack.
