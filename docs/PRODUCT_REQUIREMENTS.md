# PRODUCT_REQUIREMENTS — Akshar

## 1. Vision

Build a premium, Nepal-first education platform that lets an institution manage the student lifecycle and academic operating model from one system while remaining compatible with government curriculum and examination structures.

## 2. Users

- Platform operator
- Organization owner
- Institution administrator
- Campus administrator
- Principal / vice principal
- Academic director/coordinator
- Examination coordinator
- Teacher / subject teacher / class teacher
- Accountant / finance manager
- Admissions staff
- HR staff
- Librarian
- Transport manager
- Hostel warden
- Student
- Parent/guardian

## 3. Functional domains

### Foundation
Identity, tenancy, users, roles, permissions, institution setup, settings, audit.

### Academic
Academic years, terms, grades, programs, streams, sections, rooms, subjects, curriculum, teacher allocation, timetable.

### Student lifecycle
Lead/prospect, application, admission, enrollment, transfer, promotion, withdrawal, graduation, alumni.

### Daily operations
Attendance, leave, class sessions, assignments, notices, events, communication.

### Assessment
Assessment schemes, components, gradebook, question bank, examinations, practical assessment, results, transcripts and certificates.

### Nepal examination
SEE/Grade 10 support, Grade 11/12 examination workflows, candidate data, registration-ready data, schedule tracking, result reconciliation and official document references.

### Administration
Finance, HR/payroll-ready exports, library, transport, hostel, inventory, assets and documents.

### Portals
Admin web, teacher workspace, student portal, parent portal.

### Intelligence
MIS, academic analytics, attendance analytics, financial reporting and governed AI assistance.

## 4. Non-functional requirements

- Multi-tenant isolation
- High integrity academic records
- Auditability
- Mobile-responsive workflows
- Nepali/English localization
- Low-bandwidth awareness
- Backup and restore capability
- Observable background jobs
- Secure document access
- API-first business workflows

## 5. MVP definition

MVP should include foundation, students, admissions, academic structure, teachers, subjects, timetable, attendance, assessments, exams, results, fees and student/parent portals. Advanced transport, hostel, inventory, library, AI and national integrations can follow the core academic spine.

## 6. Product success criteria

- A student exists once and accumulates enrollment history.
- Curriculum can change without rewriting historical records.
- Teachers see only authorized classes/students.
- Results are reproducible and versioned.
- Institutions can run an academic year without spreadsheet-only operational dependencies.
- External authority integrations never rely on fabricated behavior.

## 7. Out of scope until separately contracted

- Legal certification of institutional compliance
- Government API integrations without approved technical contracts
- Automatic government submission where no supported interface exists
- Autonomous academic decision making by AI

## Source basis and governance note

This document set is derived from the supplied SWASTHYA reference material, especially its engineering-contract structure, domain-boundary approach, tenancy/RLS philosophy, RBAC separation, real-data dashboard rules, auditability, interoperability boundaries, AI governance and evidence-based roadmap discipline. The supplied material explicitly structures the foundation around documents such as MASTER_RULES, PRODUCT_REQUIREMENTS, ARCHITECTURE, DATABASE, DESIGN_SYSTEM, SECURITY, TENANCY, API_CONTRACTS, TESTING_STRATEGY, DEPLOYMENT, DISASTER_RECOVERY, OBSERVABILITY, INTEROPERABILITY, AI_RULES and ROADMAP.

Nepal-specific education-domain assumptions are aligned to current official public sources from the Curriculum Development Center (CDC) and National Examination Board (NEB). CDC describes its responsibilities around school curriculum, curriculum materials and student-assessment frameworks, and its current catalogue includes curriculum materials across school grades and technical/vocational streams. NEB currently publishes examination schedules, results, policies, Grade 10 materials and Grade 11/12 materials/services.

External authority integration must remain adapter-based. No live API, automated government submission, compliance certification or official equivalence claim is considered implemented merely because an interface exists in Akshar.
