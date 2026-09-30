# Contact form deployment

**Superseded.** This used to say to copy the Terraform output
`contact_api_base_url` into a GitHub repository variable. The deploy workflow
now reads both API URLs straight from the Terraform outputs of the same run, so
no repository variables are needed.

See [Contact form and newsletter](../README.md#contact-form-and-newsletter) in
the root README for how the form, storage, and email alerts work.
