## 1. Infrastructure
- [x] 1.1 SES domain identity for jesseforeman.com with Easy DKIM, and DKIM CNAMEs in Route 53
- [x] 1.2 Custom MAIL FROM subdomain with MX and SPF records
- [x] 1.3 IAM: allow the contact Lambda `ses:SendEmail`, restricted to the notifications@ from-address
- [x] 1.4 Lambda env (`ALERT_TO`, `ALERT_FROM`) and 10s timeout

## 2. Lambda
- [x] 2.1 Send the alert after the DynamoDB write, with Reply-To set to the sender
- [x] 2.2 Collapse visitor input to one line in the subject so it cannot inject headers
- [x] 2.3 Log alert failures by id only and still return success

## 3. Verification
- [x] 3.1 Local handler test with stubbed boto3 (success, send failure, alerts off, honeypot)
- [x] 3.2 `terraform validate` and `terraform fmt -check`
- [ ] 3.3 After deploy: SES identity shows verified, and a test submission arrives at jesse@jesseforeman.com
