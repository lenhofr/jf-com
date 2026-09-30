# Change: Email an alert for every contact-form message

## Why
Contact-form messages are stored in DynamoDB and nothing else happens. Nobody is
told, so messages are read only if someone opens the table in the AWS console. A
review on 2026-09-30 found seven real messages from January to April 2026,
including a radio-interview invitation, that had never triggered any alert. The
site now markets legal and personal-injury work and promises that "every inquiry
is read personally", so a message nobody sees is a lost client.

## What Changes
- After storing a message, the contact Lambda emails it through Amazon SES to
  every address in the Terraform variable `contact_alert_to`, with the sender's
  address as Reply-To. The default is `jesse@jesseforeman.com`, plus
  `rob.j.len@gmail.com` temporarily while alerts are tested.
- The alert is best-effort. The message is saved first, and a failed send is
  logged by id (never the body) without failing the visitor's submission.
- SES sends as `notifications@jesseforeman.com`:
  - the domain is verified with Easy DKIM (three Route 53 CNAMEs);
  - a custom MAIL FROM subdomain (`mail.jesseforeman.com`) carries SES's own SPF.
  The Microsoft 365 MX and apex SPF records are unchanged.
- The Lambda may only send from `notifications@jesseforeman.com`.

## Impact
- Affected specs: `contact-form` (message delivery)
- Affected code: `infra/terraform/lambda/contact/handler.py`
- Affected infrastructure: `infra/terraform/contact_alerts.tf` (new: SES identity,
  DNS records, IAM), `infra/terraform/contact.tf` (Lambda env and timeout)

## Non-Goals
- An inbox or admin UI.
- Alerts for newsletter signups.
- An auto-reply to the sender.
