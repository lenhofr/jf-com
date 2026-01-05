# contact-form Specification

## Purpose
TBD - created by archiving change add-contact-form. Update Purpose after archive.
## Requirements
### Requirement: Contact form submission
The system SHALL provide a contact form that allows visitors to send a message to the campaign.

#### Scenario: Visitor submits a valid message
- **WHEN** a visitor provides a valid email address and a non-empty message and submits the form
- **THEN** the system SHALL accept the message
- **AND THEN** the UI SHALL display a success confirmation

#### Scenario: Visitor submits an invalid message
- **WHEN** a visitor submits the form with missing or invalid required fields
- **THEN** the UI SHALL display validation feedback
- **AND THEN** the system SHALL NOT submit the message

#### Scenario: Destination rejects the message
- **WHEN** the destination returns an error or the request fails
- **THEN** the UI SHALL display an error message
- **AND THEN** the visitor SHOULD be able to retry

### Requirement: Stored messages
The system SHALL store accepted contact messages in an AWS DynamoDB table and SHALL NOT automatically expire or delete them.

#### Scenario: Message is accepted
- **WHEN** the ingestion API accepts a message
- **THEN** the system SHALL write a record to DynamoDB including at least: email, message, and a timestamp
- **AND THEN** the system SHALL store optional fields (e.g. name, subject) when provided

### Requirement: Message delivery to campaign
The system SHALL provide an operator-accessible delivery mechanism for accepted contact messages.

#### Scenario: Campaign receives a message without an admin UI
- **WHEN** a message is accepted
- **THEN** the system SHALL make it accessible via AWS operator tooling (e.g. DynamoDB console and/or exports)

### Requirement: Basic spam mitigation
The system SHALL include basic spam mitigation for the contact endpoint.

#### Scenario: Honeypot is filled
- **WHEN** a contact request includes a non-empty honeypot field
- **THEN** the system SHALL reject the request

#### Scenario: Traffic spikes
- **WHEN** the contact endpoint receives unusually high request volume
- **THEN** API Gateway throttling SHALL limit request rate and burst

### Requirement: No secret exposure
The system SHALL NOT require embedding private secrets (e.g., AWS credentials) into the frontend bundle to deliver contact messages.

#### Scenario: Persisting contact messages requires AWS credentials
- **WHEN** the ingestion API writes to DynamoDB
- **THEN** AWS credentials SHALL be held server-side (Lambda execution role)
- **AND THEN** the SPA SHALL only call a public HTTPS endpoint

