# SECURITY — Akshar Security Architecture

## 1. Threat model

Protect against unauthorized student access, cross-institution data leakage, account takeover, privilege escalation, malicious document access, financial fraud, exam content leakage, integration abuse and insider misuse.

## 2. Authentication

- Secure password hashing
- Rotating refresh sessions
- MFA for privileged roles
- Rate limiting
- Session revocation
- Password reset controls
- Device/session visibility where justified

## 3. Authorization

Server-side authorization must evaluate role, permission, scope and resource ownership. A hidden navigation item is never sufficient.

## 4. Data isolation

PostgreSQL RLS is the final database boundary for tenant-owned records. Application authorization remains required for domain semantics.

## 5. Sensitive domains

Special protection should apply to:

- Student identity documents
- Guardian information
- Academic results
- Exam papers
- Exam candidate data
- Payments
- HR data
- Audit information
- Integration credentials

## 6. Documents

Use short-lived signed URLs, explicit access checks and audit events.

## 7. Secrets

Secrets are environment-managed. They are never committed, displayed in UI, written to normal logs or included in support screenshots.

## 8. Audit

Audit security-sensitive actions, particularly role changes, support access, result revisions, certificate revocations, financial adjustments and external exchanges.

## 9. Security headers

Use secure browser headers including HSTS where appropriate, CSP, X-Content-Type-Options, X-Frame-Options / frame-ancestors policy, referrer policy and safe cookie settings.

## 10. Abuse controls

Rate-limit login, password reset, public certificate verification, bulk exports and integration endpoints.

## 11. Security tests

Include cross-tenant access tests, direct-route authorization tests, privilege escalation attempts, object-level authorization tests, secret scans and dependency vulnerability scans.

## 12. Incident response

Maintain playbooks for account compromise, cross-tenant leak, exam-paper exposure, payment anomaly, integration credential exposure and availability incidents.
