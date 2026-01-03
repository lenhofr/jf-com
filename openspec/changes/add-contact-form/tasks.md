## 1. Proposal decisions
- [ ] 1.1 Confirm fields (recommended: name, email, message; optional subject)
- [ ] 1.2 Confirm message delivery mechanism (store-only vs email notification)
- [ ] 1.3 Confirm spam mitigation baseline (honeypot + API Gateway throttling)
- [ ] 1.4 Confirm retention + privacy expectations (logging, exports)

## 2. Frontend implementation
- [ ] 2.1 Implement contact form UI section (anchor e.g. `#contact`) with validation + disabled/loading state
- [ ] 2.2 Implement submit handler + success/error messaging
- [ ] 2.3 Add basic spam mitigation (honeypot field)
- [ ] 2.4 Wire API base URL via Vite env var (e.g. `VITE_CONTACT_API_URL`)

## 3. Backend + integration (AWS)
- [ ] 3.1 Terraform: create DynamoDB table for contact messages
- [ ] 3.2 Terraform: create Lambda function + IAM permissions (write to table + logs)
- [ ] 3.3 Terraform: create API Gateway HTTP API route (e.g. `POST /contact`) + Lambda integration
- [ ] 3.4 Terraform: enable CORS for site origins
- [ ] 3.5 Terraform: output the public API base URL
- [ ] 3.6 (Optional) Email notification: configure SES + permissions + verified identities

## 4. Quality gates
- [ ] 4.1 Run `npm run lint`
- [ ] 4.2 Run `npm run build`
- [ ] 4.3 Manual smoke test in `npm run dev` (success + error paths)
