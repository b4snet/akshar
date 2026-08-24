# INTEROPERABILITY — Akshar External-System Architecture

## 1. Principle

External systems connect through explicit adapters. The core academic domain never becomes dependent on one provider's payload shape.

## 2. Integration registry

Each connection stores:

- system name
- authority/provider
- scope
- connection type
- status
- owner
- credential reference
- last successful exchange
- last failure
- data classification

## 3. Adapter types

- NEB
- Payment
- SMS
- Email
- WhatsApp
- Identity/SSO
- Learning/content systems
- Government reporting
- Future standards-based educational exchange

## 4. Data contracts

Map external fields to canonical Akshar objects. External terminology must not become the database schema unless it is genuinely authoritative.

## 5. Events

Use signed, idempotent event exchange where supported.

## 6. Retry

Retries use exponential backoff, dead-letter handling and operator visibility.

## 7. Consent/privacy

Only required data crosses boundaries. Export scope is authorized and logged.

## 8. Integration truthfulness

Status categories:

```text
Planned
Designed
Fixture-tested
Sandbox-tested
Pilot
Live-with-evidence
Suspended
Retired
```

Never label a designed adapter “integrated”.
