# Change: Add contact form

## Why
The site should provide a simple way for visitors to contact the candidate directly (questions, support, volunteer interest) without requiring external email clients.

## What Changes
- Add a **contact form** section that lets visitors submit a message to the campaign.
- Add an AWS-native serverless backend (same primitives/pattern as `add-signup-form`):
  - **API Gateway (HTTP API)** + **Lambda** endpoint to accept messages
  - **DynamoDB** table to store messages
- Validate input client-side and server-side; provide clear success/error feedback.
- Include basic spam mitigation (honeypot + API Gateway throttling).

## Impact
- Affected specs: `contact-form`
- Affected code (expected):
  - `frontend/src/components/*` (new Contact section)
  - `frontend/src/*` (wiring / navigation anchor)
- Affected infrastructure/ops:
  - `infra/terraform/` (DynamoDB, Lambda, API Gateway, IAM, logs)
  - CI/build config to provide the API URL to the SPA at build time

## Non-Goals
- Authenticated user messaging / inbox UI.
- Attachments or file uploads.

## Open Questions
- None.
