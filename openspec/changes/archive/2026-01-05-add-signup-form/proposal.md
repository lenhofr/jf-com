# Change: Add signup form

## Why
The site should provide a simple way for visitors to sign up for updates, so we can collect leads/supporters without requiring manual outreach.

## What Changes
- Enable the existing **signup form** UI in `#newsletter` to actually submit signups.
- Add an AWS-native serverless backend:
  - **API Gateway (HTTP API)** + **Lambda** endpoint to accept signups
  - **DynamoDB** table to store signups
- Validate input client-side and server-side; provide clear success/error feedback.

## Impact
- Affected specs: `signup-form`
- Affected code:
  - `frontend/src/components/NewsletterSection.tsx`
- Affected infrastructure/ops:
  - `infra/terraform/` (DynamoDB, Lambda, API Gateway, IAM, logs)
  - CI/build config to provide the API URL to the SPA at build time

## Non-Goals
- Full user accounts/authentication.
- Complex CRM workflows (double opt-in, segmentation) unless required by the chosen provider.

## Open Questions
- Retention/export: do we need an admin export path (manual DynamoDB export is OK initially)?
