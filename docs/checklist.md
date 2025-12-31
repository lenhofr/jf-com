# Deployment checklist (Terraform + GitHub Actions)

## Decisions
- [x] Final domain name(s): `jesseforeman.com`, `www.jesseforeman.com`
- [x] DNS approach: Route 53 hosted zone + nameserver delegation from GoDaddy
- [ ] Environments: prod only vs dev+prod
- [ ] How to source frontend code in CI:
  - [ ] submodule/subtree
  - [ ] separate repo workflow
  - [ ] clone during workflow

## AWS prerequisites
- [ ] AWS account + admin access for initial bootstrap
- [x] Terraform remote state S3 bucket exists: `tf-state-common-217354297026-us-east-1`
- [ ] (Recommended) DynamoDB table for state locking

## Terraform: core resources
- [ ] Decide initial mode:
  - [ ] `enable_custom_domain=false` (deploy early using `*.cloudfront.net`)
  - [ ] `enable_custom_domain=true` (create Route53/ACM + use `jesseforeman.com`)
- [ ] S3 bucket for frontend assets (private)
- [ ] CloudFront OAC + bucket policy
- [ ] CloudFront distribution
  - [ ] default root object `index.html`
  - [ ] custom error responses -> `/index.html` for SPA routing
- [ ] ACM cert (us-east-1)
  - [ ] DNS validation records
- [ ] Route 53 records
  - [ ] `A/AAAA` alias (if Route 53) or CNAME (if GoDaddy DNS)

## GitHub Actions
- [ ] Configure GitHub OIDC -> AWS IAM role
  - [ ] After first apply, set GitHub secret `AWS_ROLE_ARN` = `terraform output -raw github_actions_role_arn`
  - [ ] (Security) Replace AdministratorAccess with least-privilege once stable
- [ ] Workflow: `plan` on PR
- [ ] Workflow: `apply + deploy` on merge to `main`
- [ ] Build frontend and upload artifacts to S3
- [ ] CloudFront invalidation for `index.html`

## Verification
- [ ] Confirm HTTPS works + correct domain
- [ ] Confirm deep links work (SPA routing)
- [ ] Confirm caching behavior (index.html not overly cached)
