## Context
We deploy a static SPA (Vite/React) to AWS (S3 + CloudFront). A contact form needs a submission destination that does **not** require embedding private secrets in the frontend bundle.

## Goals / Non-Goals
- Goals:
  - Let visitors send a message to the campaign.
  - Provide good UX (validation + clear feedback).
  - Avoid exposing secrets.
  - Include basic spam mitigation.
- Non-Goals:
  - Logged-in messaging/inbox UI.
  - Attachments.

## Decisions
### Decision: AWS-native ingestion API
We will implement an owned serverless endpoint using AWS primitives:
- **API Gateway HTTP API** (public)
- **Lambda** handler (validate + persist)
- **DynamoDB** table (PAY_PER_REQUEST) for storage

The SPA will call the API over HTTPS, with CORS restricted to our site origin(s).

### Decision: Fields
Baseline fields are:
- name (optional)
- email (required)
- subject (optional)
- message (required)
- honeypot (hidden field, e.g. `website`) for spam mitigation

### Decision: Delivery
Default is **store in DynamoDB**. Optionally, add **email notification** (e.g. via AWS SES) so the campaign mailbox is alerted without requiring an admin UI.

## Security / Privacy
- Avoid including any private API keys in the browser.
- Ensure message data is transmitted over HTTPS.
- Spam mitigation layers:
  - **Honeypot**: hidden field that humans won’t fill; Lambda rejects requests where it’s non-empty.
  - **API Gateway throttling**: per-route/stage throttling (rate + burst) to limit abuse.
- PII handling:
  - Store only what’s needed to reply (email + message + optional name/subject).
  - Avoid logging full message bodies in CloudWatch logs.

## Open Questions
- Should name be required?
- Do we want an explicit consent/"we'll reply" checkbox?
- Retention/cleanup strategy for stored messages.
