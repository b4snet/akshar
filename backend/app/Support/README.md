# Support Layer — Shared Infrastructure

`App\Support` holds cross-cutting infrastructure that is NOT business logic:
API envelope/error contracts (`Api\`), configuration helpers, logging helpers,
and future platform services (tenancy resolution, audit writer, document
storage gateway, queue tooling).

Rules:

- Business capabilities belong in `App\Domain\<Module>` (see `../Domain/README.md`).
- HTTP concerns (controllers, requests, resources) belong in `App\Http`.
- Each capability has ONE authoritative implementation here — modules consume
  it, they do not fork it.
- Everything in this layer must be safe to use from any domain module.
