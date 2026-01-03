## 1. Proposal decisions
- [x] 1.1 Confirm fields (email only)
- [x] 1.2 Confirm duplicate handling (idempotent success)
- [x] 1.3 Confirm spam mitigation baseline (honeypot + API Gateway throttling)

## 2. Frontend implementation
- [x] 2.1 Implement form UI (labeling, validation, disabled/loading state)
- [x] 2.2 Implement submit handler + success/error messaging
- [x] 2.3 Ensure section anchor `#newsletter` continues to work
- [x] 2.4 Add basic spam mitigation (honeypot field or equivalent)

## 3. Backend + integration (AWS)
- [x] 3.1 Terraform: create DynamoDB table for signups
- [x] 3.2 Terraform: create Lambda function + IAM permissions (write to table + logs)
- [x] 3.3 Terraform: create API Gateway HTTP API route (e.g. `POST /signup`) + Lambda integration
- [x] 3.4 Terraform: enable CORS for site origins
- [x] 3.5 Terraform: output the public API base URL
- [x] 3.6 Frontend: call the API and show success/error state (replace the stubbed success-only handler)
- [x] 3.7 CI/build: inject API URL into the SPA build (Vite env var)

## 4. Quality gates
- [ ] 4.1 Run `npm run lint`
- [x] 4.2 Run `npm run build`
- [ ] 4.3 Manual smoke test in `npm run dev` (success + error paths)
