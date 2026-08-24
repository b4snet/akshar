# Domain Layer — Akshar Modular Monolith

Every business capability lives in exactly one domain module under `App\Domain\<Name>`.
Cross-module access happens only through a module's public surface (its Actions and
read models), never by reaching into another module's internal classes or tables.

## Module layout convention

A module creates sub-namespaces only when it needs them:

```
app/Domain/<Name>/
    Actions/     command-side use cases (one public action per file)
    Queries/     read-side use cases returning DTOs/resources
    Models/      Eloquent models owned by this module
    Data/        DTOs, value objects, form/request payloads
    Policies/    authorization policies (mirrors RBAC.md)
    Events/      domain events
    Listeners/
    Jobs/        queued work owned by the module
    Rules/       validation rules
    Exceptions/
```

## Registry

| Module | Namespace | Scope | Status |
| --- | --- | --- | --- |
| Platform | `App\Domain\Platform` | Cross-cutting platform primitives (tenancy context, audit trail, settings) shared by all modules. | Not started |
| Identity | `App\Domain\Identity` | Users, credentials, sessions, roles, permissions, API tokens. | Not started |
| Organizations | `App\Domain\Organizations` | Tenant root: organizations owning institutions, subscription state. | Not started |
| Institutions | `App\Domain\Institutions` | Institutions (schools) within an organization. | Not started |
| Campuses | `App\Domain\Campuses` | Campuses within institutions; campus-scoped resource boundaries. | Not started |
| Academic | `App\Domain\Academic` | Academic years, terms/classes, sections, grade levels. | Not started |
| Curriculum | `App\Domain\Curriculum` | Subjects, curricula, learning objectives. | Not started |
| Students | `App\Domain\Students` | Student records, guardians, enrollment lifecycle. | Not started |
| Admissions | `App\Domain\Admissions` | Applications, admission workflow. | Not started |
| People | `App\Domain\People` | Teachers and staff profiles, assignments. | Not started |
| Timetable | `App\Domain\Timetable` | Periods, timetables, substitutions. | Not started |
| Attendance | `App\Domain\Attendance` | Student and staff attendance capture and summaries. | Not started |
| Learning | `App\Domain\Learning` | Lesson plans, homework, learning materials. | Not started |
| Assessment | `App\Domain\Assessment` | Assessments, marks entry, mark sheets. | Not started |
| Examination | `App\Domain\Examination` | Exams, scheduling, invigilation. | Not started |
| Results | `App\Domain\Results` | Result computation, verification, publication, revision (RESULT_RULES). | Not started |
| Documents | `App\Domain\Documents` | Document storage, categories, retention, sharing. | Not started |
| Finance | `App\Domain\Finance` | Fee structures, invoices, payments, receipts, concessions. | Not started |
| Notifications | `App\Domain\Notifications` | Notification templates, delivery channels, preferences. | Not started |
| Library | `App\Domain\Library` | Catalogue, circulation, fines. | Not started |
| Transport | `App\Domain\Transport` | Routes, vehicles, stops, transport fees. | Not started |
| Hostel | `App\Domain\Hostel` | Rooms, allocations, hostel attendance. | Not started |
| Hr | `App\Domain\Hr` | HR records, payroll inputs, leave management. | Not started |
| Analytics | `App\Domain\Analytics` | Dashboards, reports, aggregates, exports. | Not started |
| Integrations | `App\Domain\Integrations` | External adapters (SMS, email, payment, NEB), webhook dispatch/receipt. | Not started |
| Administration | `App\Domain\Administration` | Organization-level administration utilities not owned by other modules. | Not started |

Status values: `Not started`, `In progress`, `Stable`. Update this table when a module
begins implementation; never introduce a business capability outside this registry.
