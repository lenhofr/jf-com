# Deployment checklist (Terraform + GitHub Actions)

## Decisions
- [x] Final domain name(s): `jesseforeman.com`, `www.jesseforeman.com`
- [x] DNS approach: Route 53 hosted zone + nameserver delegation from GoDaddy
- [x] Environments: prod only
- [x] How to source frontend code in CI:
  - [x] submodule/subtree
  - [ ] separate repo workflow
  - [ ] clone during workflow

## AWS prerequisites
- [x] AWS account + admin access for initial bootstrap
- [x] Terraform remote state S3 bucket exists: `tf-state-common-217354297026-us-east-1`
- [ ] (Recommended) DynamoDB table for state locking

## Terraform: core resources
- [x] Initial deploy mode: `enable_custom_domain=false` (preview via `*.cloudfront.net`)
- [x] S3 bucket for frontend assets (private)
- [x] CloudFront OAC + bucket policy
- [x] CloudFront distribution
  - [x] default root object `index.html`
  - [x] custom error responses -> `/index.html` for SPA routing

## GitHub Actions
- [x] Configure GitHub OIDC -> AWS IAM role
  - [x] GitHub secret `AWS_ROLE_ARN` set
  - [ ] (Security) Replace AdministratorAccess with least-privilege once stable
- [x] Workflow: `plan` on PR
- [x] Workflow: `apply + deploy` on merge to `main`
- [x] Build frontend and upload artifacts to S3
- [x] CloudFront invalidation for `index.html`

## Custom domain cutover (`jesseforeman.com`)
- [x] Create Route 53 hosted zone
- [x] Set GoDaddy nameservers to Route 53 delegation set
- [x] ACM cert (us-east-1) is `ISSUED`
- [x] Apply completed for CloudFront aliases + Route53 A/AAAA
- [x] Verify:
  - [x] https://jesseforeman.com
  - [x] https://www.jesseforeman.com

## Verification
- [x] Confirm CloudFront preview works (https://d31fhnlp8dwj8o.cloudfront.net)
- [ ] Confirm deep links work (SPA routing)
- [ ] Confirm caching behavior (index.html not overly cached)
