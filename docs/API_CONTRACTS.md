# API_CONTRACTS — Akshar API Standards

## 1. Base path

`/api/v1`

## 2. Envelope

Successful response:

```json
{
  "data": {},
  "meta": {}
}
```

Error response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid.",
    "details": []
  }
}
```

Exact public message wording may evolve, but error codes remain stable for clients.

## 3. Resource examples

```text
GET    /students
POST   /students
GET    /students/{student}
PATCH  /students/{student}

GET    /enrollments
POST   /enrollments

GET    /subjects
GET    /curricula
GET    /assessments
POST   /marks
POST   /results/{result}/verify
POST   /results/{result}/publish
POST   /results/{result}/revise

GET    /fees/invoices
POST   /payments
```

## 4. Commands

Use explicit command endpoints when the operation changes an authoritative state or invokes workflow rules.

## 5. Idempotency

Payment, imports, external exchange, bulk notifications and other retry-prone mutation endpoints accept idempotency keys.

## 6. Authorization

Every endpoint resolves identity, organization/institution/campus context and permission before loading sensitive resources where feasible.

## 7. Pagination

Use cursor or deterministic page pagination. The API returns total/count metadata only where operationally justified.

## 8. Filtering and sorting

Whitelist supported fields. Do not build raw SQL from user-supplied sort or filter strings.

## 9. Versioning

Breaking changes require a version boundary or compatible migration plan.

## 10. Bulk operations

Bulk endpoints report item-level success/failure and use safe asynchronous processing where volume is material.

## 11. Webhooks

Webhooks are signed, replay-aware and idempotent. Receivers verify signature and timestamp before processing.

## 12. Health

`GET /api/v1/health` returns the standard success envelope and serves as the liveness probe for the API:

```json
{
  "data": {
    "service": "Akshar",
    "status": "ok",
    "environment": "local",
    "framework": "13.26.1",
    "time": "2026-08-24T08:00:00+00:00"
  },
  "meta": { "apiVersion": "v1" }
}
```

All errors under `/api/v1/*` use the error envelope from §2, with stable codes including: `BAD_REQUEST`, `UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `VALIDATION_ERROR`, `RATE_LIMITED`, `METHOD_NOT_ALLOWED`, `SERVER_ERROR`.
