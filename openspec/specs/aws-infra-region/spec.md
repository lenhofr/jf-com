# aws-infra-region Specification

## Purpose
TBD - created by archiving change migrate-aws-region-us-east-1. Update Purpose after archive.
## Requirements
### Requirement: Regional AWS resources in us-east-1
The system SHALL deploy all Terraform-managed **regional AWS resources** in the `us-east-1` region.

#### Scenario: Terraform applies infrastructure in us-east-1
- **WHEN** Terraform is applied for the production environment
- **THEN** regional resources (e.g., S3 bucket location, Lambda, API Gateway, DynamoDB) SHALL be created in `us-east-1`

### Requirement: Bootstrap resources in us-east-1
The system SHALL create/maintain Terraform backend bootstrap resources in `us-east-1`.

#### Scenario: Bootstrap run creates backend resources
- **WHEN** the Terraform bootstrap module is applied
- **THEN** the created backend resources (S3 state bucket and DynamoDB lock table) SHALL be in `us-east-1`

### Requirement: Safe migration from us-west-2
The system SHALL support migrating existing Terraform-managed regional resources from `us-west-2` to `us-east-1` while maintaining site availability.

#### Scenario: Migration cutover
- **WHEN** the us-east-1 stack is created and the site is cut over to it
- **THEN** the site SHALL remain available during the cutover
- **AND THEN** rollback SHOULD be possible by reverting the cutover

### Requirement: Retire us-west-2 resources
After migration completion, Terraform-managed regional resources in `us-west-2` SHALL be decommissioned.

#### Scenario: Migration is complete
- **WHEN** the migration is declared complete
- **THEN** Terraform state SHALL no longer manage regional resources deployed in `us-west-2`

