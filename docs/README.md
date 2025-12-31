# Docs

This directory tracks decisions and step-by-step work to deploy the **kentucky-forward** frontend as a static site on AWS using **Terraform** and **GitHub Actions**.

## Recommended approach (high-level)
- Host build artifacts in **S3** (private bucket)
- Serve through **CloudFront** (TLS + caching)
- Use **ACM** certificate in **us-east-1**
- Manage DNS via **Route 53** (recommended), even if the domain is registered at GoDaddy
- Configure SPA routing so unknown paths return `/index.html`

## Monorepo layout
- `frontend/` — the Vite/React SPA
- `infra/terraform/` — AWS infrastructure + GitHub Actions deploy role

## Start here
- [AWS Static SPA plan](./aws-static-spa.md)
- [Terraform + GitHub Actions checklist](./checklist.md)
