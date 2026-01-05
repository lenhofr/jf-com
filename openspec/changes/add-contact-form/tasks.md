## 1. Proposal decisions
- [x] 1.1 Confirm fields (required: email, message; optional: name, subject)
- [x] 1.2 Confirm message delivery mechanism (store-only)
- [x] 1.3 Confirm spam mitigation baseline (honeypot + API Gateway throttling)
- [x] 1.4 Confirm retention + privacy expectations (no cleanup/TTL; avoid logging message bodies)

## 2. Frontend implementation
- [x] 2.1 Implement contact form UI section (anchor e.g. `#contact`) with validation + disabled/loading state
- [x] 2.2 Implement submit handler + success/error messaging
- [x] 2.3 Add basic spam mitigation (honeypot field)
- [x] 2.4 Wire API base URL via Vite env var (e.g. `VITE_CONTACT_API_URL`)

## 3. Backend + integration (AWS)
- [x] 3.1 Terraform: create DynamoDB table for contact messages
- [x] 3.2 Terraform: create Lambda function + IAM permissions (write to table + logs)
- [x] 3.3 Terraform: create API Gateway HTTP API route (e.g. `POST /contact`) + Lambda integration
- [x] 3.4 Terraform: enable CORS for site origins
- [x] 3.5 Terraform: output the public API base URL

## 4. Quality gates
- [x] 4.1 Run `npm run lint`
- [x] 4.2 Run `npm run build`
- [ ] 4.3 Manual smoke test in `npm run dev` (success + error paths)
