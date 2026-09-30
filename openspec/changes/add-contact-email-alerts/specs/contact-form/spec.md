## RENAMED Requirements
- FROM: `### Requirement: Message delivery to campaign`
- TO: `### Requirement: Message delivery`

## MODIFIED Requirements
### Requirement: Message delivery
The system SHALL keep every accepted contact message accessible via AWS operator tooling, and SHALL send an email alert for each accepted message to a configured recipient.

#### Scenario: Operator reviews stored messages
- **WHEN** a message is accepted
- **THEN** the system SHALL make it accessible via AWS operator tooling (e.g. DynamoDB console and/or exports)

#### Scenario: Recipient is alerted by email
- **WHEN** a message is accepted and stored
- **THEN** the system SHALL email the message's name, email, subject, message, and timestamp to the configured recipient
- **AND THEN** the email's Reply-To SHALL be the sender's address

#### Scenario: Alert delivery fails
- **WHEN** the email alert cannot be sent
- **THEN** the stored message SHALL remain in DynamoDB
- **AND THEN** the visitor SHALL still receive a success response
- **AND THEN** the system SHALL log the failure with the message id and without the message body
