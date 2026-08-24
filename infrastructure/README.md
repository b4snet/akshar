# Infrastructure — Environment Contract

This directory is the single home of Akshar's environment definitions. The
environment ladder follows `docs/DEPLOYMENT.md` §1:

```text
Local  →  CI  →  Staging  →  Production
```

| Layer | Defined by | Status |
| --- | --- | --- |
| Local services | `compose.dev.yaml` (this directory) | Defined; requires Docker on the host |
| Local variables | `.env.example` (root reference) + `backend/.env.example` | Enforced by `npm run env:check` |
| CI | `.github/workflows/ci.yml` | Defined — job-scoped `postgres:17-alpine` + `redis:7-alpine` services, migrations + route smoke |
| Staging / production | external secret configuration + deployment pipeline | Later phases per `docs/DEPLOYMENT.md` |

## Local development topology

`docker compose -f infrastructure/compose.dev.yaml up -d --wait`
(or `npm run db:up`):

| Service | Image | Host port | Notes |
| --- | --- | --- | --- |
| PostgreSQL 17 | `postgres:17-alpine` | 127.0.0.1:5432 | DB `akshar`, user `akshar`, password `secret` (dev-only defaults) |
| Redis 7 | `redis:7-alpine` | 127.0.0.1:6379 | No persistence locally; backend may keep database drivers until queues/cache move to Redis |

First initialization also creates `akshar_testing` via
`postgres/init/01-databases.sql`, so PHPUnit runs against real PostgreSQL
(`docs/TESTING_STRATEGY.md` §13). After the stack is up:

```bash
npm run db:migrate   # php backend/artisan migrate --force
npm run db:down      # stop and remove the local stack
```

## Variable contract rules

1. Committed templates are the ONLY place default values live; every variable
   must be overridable by environment injection in CI/staging/production.
2. Secret values are never committed or printed (`docs/DEPLOYMENT.md` §8).
   `APP_KEY=` stays empty in templates and is generated locally with
   `php backend/artisan key:generate`.
3. The machine-readable definition of required/pinned variables is
   `scripts/env-contract.mjs`; `npm run env:check` enforces it and
   `npm run test:env` keeps it covered (including drift between templates).
4. Only `VITE_*` frontend variables reach the browser bundle — never secrets.

## Known constraints

- Containers require Docker on the developer host; this repository's automation
  fails gracefully with a hint when Docker is absent.
- CI provisions equivalent services itself (`postgres:17-alpine`, `redis:7-alpine`
  job-scoped containers with test-only credentials); it does not read this
  compose file. Keep both definitions aligned when changing versions or ports.
- Object storage (S3-compatible) intentionally has no local container yet; it
  arrives with its owning phase.
