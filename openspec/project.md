# Project Context

## Purpose
This repo contains the **jf-com** frontend (a static SPA) and the **Terraform** infrastructure to deploy it to AWS, currently serving:
- https://jesseforeman.com
- https://www.jesseforeman.com

## Tech Stack
### Frontend (`frontend/`)
- Vite + React 18 + TypeScript
- React Router
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- TanStack Query, React Hook Form, Zod
- Tooling: Prettier, ESLint (typescript-eslint), PostCSS + autoprefixer

### Infrastructure (`infra/terraform/`)
- Terraform
- AWS: S3 (private bucket), CloudFront (OAC), ACM (cert in **us-east-1**), Route 53, IAM (GitHub Actions OIDC role)
- Domain registrar: GoDaddy (nameserver delegation to Route 53)

### CI/CD
Intended flow is via GitHub Actions using OIDC (IAM role is created by Terraform); see `docs/aws-static-spa.md` + `docs/checklist.md`.

## Project Conventions

### Code Style
Frontend:
- TypeScript + functional React components + hooks.
- Import alias: `@/` → `frontend/src/*` (see `frontend/tsconfig.json`).
- Formatting via Prettier: `npm run format` / `npm run format:check`.
- Lint via `npm run lint` (see `frontend/eslint.config.js`).
- Styling via Tailwind; prefer shared UI primitives in `frontend/src/components/ui/*` (shadcn/ui).

Infra:
- Terraform resources are named/prefixed using `var.project_name` (default: `jf-com`).
- Prefer small, readable Terraform modules/files; keep everything in `infra/terraform/` unless there’s a clear reason to split.

### Architecture Patterns
- Build artifact is a static SPA (`frontend/dist/`).
- Hosting pattern:
  - S3 bucket is private (no public website endpoint).
  - CloudFront serves the site via OAC.
  - SPA routing uses CloudFront custom error responses to serve `/index.html` for deep links.
- `enable_custom_domain` gates Route 53 + ACM + CloudFront aliases.
- Caching: hashed assets under `/assets` cached aggressively; `index.html` cached minimally (see `infra/terraform/main.tf`).

### Testing Strategy
- No dedicated test runner is configured currently.
- Use `npm run lint` and `npm run build` as the primary quality gates.
- Validate behavior via local `npm run dev` / `npm run preview` and production smoke tests.

### Git Workflow
- Default branch is `main` and is the **deploy branch**.
- Single environment: **prod only**.
- Prefer PRs for changes.
- Infra/docs describe: Terraform plan on PR; apply + deploy on merge to `main` (see `docs/checklist.md`).

## Domain Context
- Site is a static marketing/personal site for the `jesseforeman.com` domain.
- Terraform remote state is configured (see `infra/terraform/versions.tf`) to use S3:
  - bucket: `tf-state-common-217354297026-us-east-1`
  - key/prefix: `jf-com/terraform.tfstate`

## Important Constraints
- Keep the site bucket private; only CloudFront should read it (via OAC).
- Use GitHub Actions OIDC (no long-lived AWS keys). Terraform outputs `github_actions_role_arn` for the `AWS_ROLE_ARN` GitHub secret.
- ACM certificates for CloudFront must be issued in **us-east-1**.
- Run Terraform from `infra/terraform/`.

## External Dependencies
- AWS account (S3, CloudFront, ACM, Route 53, IAM)
- GoDaddy (domain registration / nameserver delegation)
- Lovable (project scaffold + optional editing workflow; see `frontend/README.md`)
