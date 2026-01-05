# Change: Migrate Terraform-managed AWS region to us-east-1

## Why
Our Terraform-managed regional infrastructure is currently deployed in **us-west-2**. We want to standardize on **us-east-1** for all regional resources to reduce latency for our audience and align with existing CloudFront/ACM patterns (ACM for CloudFront already uses us-east-1).

## What Changes
- Update Terraform to deploy **regional resources** in **us-east-1** instead of us-west-2.
- Migrate existing Terraform-managed regional resources from us-west-2 to us-east-1.
- Ensure the site remains available during the migration and that rollback is possible.

## Impact
- Affected specs: `aws-infra-region`
- Affected infrastructure/ops:
  - `infra/terraform/*` (provider region default, resource naming where needed for parallel migration)
  - `infra/terraform/bootstrap/*` (bootstrap region)
  - Potentially CloudFront origin cutover and SPA env vars for any regional APIs

## Non-Goals
- Multi-region active/active deployments.
- Redesigning the hosting architecture (still S3 + CloudFront).

## Open Questions
- None.
