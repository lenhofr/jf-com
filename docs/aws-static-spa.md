# AWS static SPA hosting (Terraform + GitHub Actions)

## What we’re deploying
A static single-page app (SPA) built elsewhere (currently: Vite/React/TS) and deployed to AWS.

## Architecture
1. **S3 bucket (private)**
   - Stores compiled frontend assets (e.g. `dist/`)
   - Block all public access
   - No website hosting endpoint needed

2. **CloudFront distribution**
   - Origin: S3 bucket via **Origin Access Control (OAC)**
   - Default root object: `index.html`
   - Compression: on
   - Cache policy: optimized caching for hashed assets; short caching for `index.html`

3. **SPA routing behavior**
CloudFront should serve `index.html` for client-side routes.

Recommended:
- CloudFront **custom error response**:
  - 403 and/or 404 -> respond with `/index.html` and HTTP 200

4. **TLS certificate (ACM)**
- Must be in **us-east-1** for CloudFront.
- Validated via DNS (Route 53 makes this easy).

5. **Domain/DNS (GoDaddy registrar)**
Two common options:
- **Recommended**: create a Route 53 Hosted Zone and switch the domain’s nameservers at GoDaddy to Route 53.
- Alternative: keep GoDaddy DNS and add the needed records there (CNAME to CloudFront). Route 53 still helps for ACM validation, but is less clean.

### Deploying before DNS cutover (`enable_custom_domain`)
In this repo’s Terraform, custom-domain resources are gated behind:
- `enable_custom_domain` (default: `false`)

When `enable_custom_domain=false`:
- CloudFront uses its **default hostname** (`*.cloudfront.net`) and default TLS cert
- Route 53 zone + ACM cert + DNS records are **not created**
- You can still deploy and view the site via the `cloudfront_domain_name` output

When you’re ready to go live on `jesseforeman.com`:
- set `enable_custom_domain=true`
- run `terraform apply`
- take `terraform output route53_nameservers` and paste those nameservers into GoDaddy to delegate DNS

### Current status (live)
- Preview deployment works on CloudFront default hostname: https://d31fhnlp8dwj8o.cloudfront.net
- Domain cutover is complete and the site is live:
  - https://jesseforeman.com
  - https://www.jesseforeman.com
- ACM certificate is `ISSUED` and attached to CloudFront.

## Repo layout (suggested)
This infra repo (current repo):
- `infra/terraform/` (root module)
- `.github/workflows/deploy.yml`

## Where to run Terraform
Run Terraform from:
- `infra/terraform/`

Typical commands:
```sh
cd infra/terraform
terraform init
terraform plan
terraform apply
```

Remote state is configured in `infra/terraform/versions.tf` to use:
- S3 bucket: `tf-state-common-217354297026-us-east-1`
- key: `jf-com/terraform.tfstate` (this is the "folder"/prefix)

Frontend source repo/location:
- Decide whether the frontend is:
  - a separate repo with its own workflow, or
  - vendored into this repo (submodule/subtree), or
  - pulled during CI (git clone) at build time.

## CI/CD flow (GitHub Actions)
1. Build frontend
   - `npm ci`
   - set `VITE_SIGNUP_API_URL` from Terraform output `signup_api_base_url`
   - set `VITE_CONTACT_API_URL` from Terraform output `contact_api_base_url`
   - `npm run build`
2. Terraform apply
   - create/maintain S3 + CloudFront + ACM + Route53
3. Upload artifacts to S3
4. CloudFront invalidation
   - invalidate `/index.html` and optionally `/*` (prefer minimal invalidations)

## AWS auth from GitHub Actions
Recommended:
- Use **OIDC** (no long-lived AWS keys)
- Create an IAM role assumable by GitHub Actions

## Next decisions needed
- Domain name (apex vs www): **jesseforeman.com** + **www.jesseforeman.com**
- DNS approach: **Route 53 hosted zone + nameserver delegation from GoDaddy**
- Where the frontend lives relative to this infra repo
- Environments: dev/stage/prod or just prod
