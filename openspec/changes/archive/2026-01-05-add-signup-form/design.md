## Context
We currently deploy a static SPA (Vite/React) to AWS (S3 + CloudFront). A signup form needs a submission destination that does **not** require embedding private secrets in the frontend bundle.

## Goals / Non-Goals
- Goals:
  - Collect signups from the website reliably.
  - Provide good UX (validation + clear feedback).
  - Avoid exposing secrets.
- Non-Goals:
  - Full user accounts/auth.

## Decisions
### Decision: AWS-native ingestion API
We will implement an owned serverless endpoint using AWS primitives:
- **API Gateway HTTP API** (public)
- **Lambda** handler (validate + persist)
- **DynamoDB** table (PAY_PER_REQUEST) for storage

The SPA will call the API over HTTPS, with CORS restricted to our site origin(s).

### Decision: Fields
- email only (matches existing UI)

### Decision: Duplicate handling
- duplicates are treated as **idempotent success**

## Security / Privacy
- Avoid including any private API keys in the browser.
- Ensure signup data is transmitted over HTTPS.
- Spam mitigation layers:
  - **Honeypot**: add an extra hidden field (e.g. `website`) that humans won’t fill; Lambda rejects requests where it’s non-empty.
  - **API Gateway throttling**: set per-route/stage throttling (rate + burst) to limit abuse.

## Rollout
- Ship behind UI only (no routing changes).
- Verify submissions are received in the chosen destination.

## Implementation Notes
- DynamoDB schema:
  - partition key: normalized email
  - attributes: `createdAt`, `updatedAt`
- CORS allowed origins:
  - `https://jesseforeman.com`
  - `https://www.jesseforeman.com`
  - `http://localhost:5173` (local dev)
- API Gateway throttling (initial defaults):
  - rate: 5 req/sec
  - burst: 10
