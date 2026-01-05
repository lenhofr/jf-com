# jf-com

## Deploy notes

After `terraform apply`, set GitHub repo variables used at build time:

- `VITE_SIGNUP_API_URL` (Terraform output `signup_api_base_url`)
- `VITE_CONTACT_API_URL` (Terraform output `contact_api_base_url`)
