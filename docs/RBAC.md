# RBAC — Akshar Roles, Permissions and Scope

## 1. Identity model

```text
Person
 ↓
User Identity
 ↓
Role Assignment
 ↓
Permission Set
 ↓
Scope
```

## 2. Role families

- Platform Super Admin
- Organization Admin
- Institution Admin
- Campus Admin
- Principal / Vice Principal
- Academic Coordinator
- Examination Coordinator
- Teacher / Subject Teacher / Class Teacher
- Accountant / Finance Manager
- Admission Officer
- HR Manager
- Librarian
- Transport Manager
- Hostel Warden
- Inventory/Asset Officer
- Student
- Parent/Guardian

## 3. Permissions

Use action-oriented permissions such as:

```text
student.read
student.write
attendance.write
assessment.mark.write
assessment.mark.approve
result.verify
result.publish
result.revise
certificate.issue
certificate.revoke
fee.post
fee.adjust
payment.refund
user.manage
role.assign
```

## 4. Scope

Permissions may be scoped to organization, institution, campus, grade, section, subject or explicit assigned students.

## 5. Separation of duties

Examples:

- Marker should not be able to approve their own high-risk result revision.
- Finance clerk should not approve their own refund.
- Teacher should not automatically see payroll.
- Administrator should not automatically gain examination-authority permissions merely because they are an administrator.

## 6. UI behavior

Navigation is generated from entitlements and role scope, but every API action performs authorization again.

## 7. Privileged actions

Require re-authentication or step-up verification for sensitive operations where appropriate.

## 8. Audit

Role assignment, permission changes and support access are always audited.
