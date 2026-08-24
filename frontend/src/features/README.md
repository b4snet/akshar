# Feature Modules

Bounded vertical slices of product functionality. Each feature owns its routes,
components, API calls, hooks and tests; it may not reach into another feature's
internals.

```
features/<name>/
    components/
    api/          typed calls built on services/api
    hooks/
    pages/        route-level screens
    __tests__/
```

Rules:

- Shared UI primitives come from `src/components`, platform concerns from
  `src/services` — never reimplemented per feature.
- A feature is registered in `src/app/router.tsx`; the router stays the only
  place that knows the URL map.
- No feature directories exist yet; create them with this layout as modules
  enter scope in later phases.
