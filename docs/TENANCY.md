# TENANCY — Akshar Multi-Tenant Architecture

## 1. Hierarchy

```text
Platform
 └── Organization
      └── Institution
           └── Campus
                └── Department / Unit / Scope
```

## 2. Tenant isolation

Every organization must be isolated from every other organization. Institution and campus boundaries are additional authorization scopes.

## 3. Context resolution

```text
Authenticated identity
 → organization memberships
 → institution memberships
 → campus scope
 → active context
```

A user with one authorized campus should have it selected automatically. A multi-campus user receives an explicit context selector. An unauthorized campus must not become selectable by URL manipulation.

## 4. RLS

Tenant-owned tables use PostgreSQL RLS. Application-role database access is non-owner/non-bypass wherever possible so policies are exercised in real operation.

## 5. Support sessions

Platform support access is explicit, time-bounded, purpose-recorded and audited. Support must not silently grant organization-admin rights.

## 6. Data imports

Imports must execute within the target tenant context and validate every referenced campus/institution ID.

## 7. Public resources

Public certificate verification and public institution pages are handled through narrowly scoped public-safe queries rather than bypassing the tenant model.

## 8. Tests

For every tenant-owned domain prove:

- tenant A cannot read tenant B;
- institution A cannot read institution B where cross-institution access is not allowed;
- campus-scoped roles cannot escalate to organization-wide access;
- imports and jobs preserve scope;
- exports cannot cross scope.
