# DEPLOYMENT — Akshar Delivery Architecture

## 1. Environments

```text
Local
 ↓
CI
 ↓
Staging
 ↓
Production
```

## 2. Preconditions

- Tests green
- Migration review complete
- Secrets configured externally
- Backup checkpoint
- Rollback plan
- Monitoring enabled
- Responsible approvers identified

## 3. Database deployment

Migrations must be forward-safe. Destructive changes require staged compatibility and explicit review.

## 4. Application deployment

Use immutable build artifacts where supported. Record commit/build metadata.

## 5. Staging gates

Exercise authentication, tenant isolation, enrollment, attendance, marks, result publication, finance and critical portal flows.

## 6. Production go/no-go

A “ready to deploy” decision is separate from a “safe to claim production readiness” decision.

## 7. Rollback

Application rollback must preserve database compatibility. Prefer forward-fix for irreversible migrations.

## 8. Secrets

Never print or commit secret values.

## 9. External integrations

Each integration has environment-specific endpoints and credentials. Sandbox/test evidence must not be presented as production evidence.

## 10. Release notes

Every release documents changed domains, migrations, flags, known limitations and operational checks.
