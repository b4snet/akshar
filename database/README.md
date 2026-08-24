# Database Assets

Cross-stack database artifacts that live outside Laravel's migration system:

- PostgreSQL row-level security policies and related SQL (the final tenancy
  boundary per `docs/TENANCY.md`) — added when the tenancy phase begins.
- Migration ordering/backfill runbooks for data migration phases.

Conventions:

- Schema evolution is owned by `backend/database/migrations` (Laravel).
- Raw SQL here must be idempotent, reviewed against `docs/DATABASE.md`, and
  referenced from the checkpoint report of the phase that introduces it.
- Test databases use PostgreSQL only; SQLite is not an accepted test target.
