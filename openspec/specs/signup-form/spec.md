# signup-form Specification

## Purpose
TBD - created by archiving change add-signup-form. Update Purpose after archive.
## Requirements
### Requirement: Signup form collection
The system SHALL provide a signup form that allows visitors to submit their contact information to receive updates.

#### Scenario: Visitor submits a valid signup (email)
- **WHEN** a visitor enters a valid email address and submits the form
- **THEN** the system SHALL accept the signup and persist it
- **AND THEN** the UI SHALL display a success confirmation

#### Scenario: Visitor submits a duplicate email
- **WHEN** a visitor submits the form with an email address that was previously submitted
- **THEN** the system SHALL treat the request as idempotent success
- **AND THEN** the UI SHALL display a success confirmation

#### Scenario: Visitor submits an invalid signup
- **WHEN** a visitor submits the form with missing or invalid required fields
- **THEN** the UI SHALL display validation feedback
- **AND THEN** the system SHALL NOT submit the signup

#### Scenario: Destination rejects the signup
- **WHEN** the destination returns an error or the request fails
- **THEN** the UI SHALL display an error message
- **AND THEN** the visitor SHOULD be able to retry

### Requirement: Storage in AWS
The system SHALL store accepted signups in an AWS DynamoDB table.

#### Scenario: Signup is accepted
- **WHEN** the ingestion API accepts a signup
- **THEN** the system SHALL write a record to DynamoDB including the email and a timestamp

### Requirement: Basic spam mitigation
The system SHALL include basic spam mitigation for the signup endpoint.

#### Scenario: Honeypot is filled
- **WHEN** a signup request includes a non-empty honeypot field
- **THEN** the system SHALL reject the request

#### Scenario: Traffic spikes
- **WHEN** the signup endpoint receives unusually high request volume
- **THEN** API Gateway throttling SHALL limit request rate and burst

### Requirement: No secret exposure
The system SHALL NOT require embedding private secrets (e.g., AWS credentials) into the frontend bundle to deliver signups.

#### Scenario: Persisting signups requires AWS credentials
- **WHEN** the ingestion API writes to DynamoDB
- **THEN** AWS credentials SHALL be held server-side (Lambda execution role)
- **AND THEN** the SPA SHALL only call a public HTTPS endpoint

