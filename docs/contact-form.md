# Contact form deployment

## Required GitHub repo variables

After Terraform apply, set this GitHub **Repository Variable** (not secret):

- `VITE_CONTACT_API_URL` = Terraform output `contact_api_base_url`

This value is consumed by the deploy workflow to build the Vite SPA and wire the contact form submission endpoint.
