# DESIGN_SYSTEM — Akshar Product Interface

## 1. Design direction

Akshar should feel like a premium education operating system: calm, professional, information-dense without being cramped, and clearly different from generic AI-generated admin templates.

## 2. Theme

Light-first:

- White primary surfaces
- Very light neutral page backgrounds
- Dark text
- One Akshar accent color
- Restrained semantic status colors

No dark mode is required for the initial product unless a future accessibility/product study justifies it.

## 3. Application shell

```text
Top bar
 ├── Akshar
 ├── Global search
 ├── Current organization/institution/campus
 ├── Notifications
 ├── Language
 ├── Help
 └── Profile

Sidebar
 └── Module → Submodule → Workflow
```

## 4. Navigation

Do not flatten every feature into one list. Only display modules enabled for the institution and authorized for the user.

## 5. Dashboard

`/dashboard` is a real operational dashboard, not a feature-grid page.

## 6. Component system

Shared components:

- Button
- Input
- Select
- Combobox
- Date picker
- Dialog
- Drawer
- Tabs
- Badge
- Toast
- Table
- Pagination
- Empty state
- Loading state
- Error state
- Permission state
- Timeline
- Stat card
- Chart

## 7. Tables

One global data-table system supports sorting, filtering, pagination, row actions, empty/error/loading states and responsive behavior.

## 8. Forms

Forms have clear labels, help text, validation, server-error mapping and accessible semantics. Native semantics remain; browser-default visual styling does not.

## 9. Academic data visualization

Use restrained visualization for attendance, academic trends, finance and enrollment. No chart should exist without real data.

## 10. Responsive behavior

Teachers and parents should be able to complete priority workflows on phone-sized screens. Dense administration views may remain optimized for tablet/desktop.

## 11. Localization

All user-facing labels are translation keys. Support English and Nepali, including Devanagari rendering.

## 12. Accessibility

Target WCAG 2.2 AA practices where feasible: keyboard access, visible focus, contrast, labels, semantic hierarchy, reduced motion considerations and non-color-only status communication.

### Non-negotiable engineering rules
1. One authoritative source of truth per domain.
2. No feature is considered implemented because a route, screen, button or mock exists.
3. Authorization is enforced server-side; UI visibility is not a security boundary.
4. Tenant/institution/campus isolation is enforced at the data layer where applicable.
5. Published academic results are versioned and corrected through controlled revision workflows; never silently overwritten.
6. Curriculum, grading, promotion, fee and examination rules are configuration- and version-driven, not scattered hard-coded constants.
7. External integrations are represented as adapters with explicit status: planned, fixture-tested, sandbox, or live-with-evidence.
8. Analytics must use actual data and distinguish zero from unavailable/error.
9. AI is assistive and governed; authoritative calculations and academic decisions remain deterministic and auditable.
10. Every security-sensitive, academic-authority and financial mutation must be auditable.
11. Nepal calendar display may support BS and AD, while machine dates remain ISO/Gregorian internally.
12. English and Nepali must be first-class localization targets without duplicating domain logic.
