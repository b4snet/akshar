# CURRICULUM — Nepal Curriculum Architecture

## 1. Purpose

Model national, local and institution-specific curriculum without hard-coding one year's policy into software.

## 2. Authority model

```text
Education Authority
  ├── CDC / national curriculum references
  ├── Local curriculum authority / configured local content
  └── Institution curriculum extensions
```

CDC currently describes its role as developing, revising and updating school curriculum, textbooks and related materials, and as supporting student-assessment frameworks. Its current catalogue spans general and technical/vocational curriculum materials. citeturn257100search1turn257100search2

## 3. Curriculum entities

- Curriculum framework
- Curriculum version
- Grade/level applicability
- Subject
- Subject version
- Learning outcome
- Unit/chapter/topic
- Teaching hour / workload
- Assessment component
- Specification table reference
- Sample question reference
- Source document

## 4. Versioning

```text
Subject
 ├── Version A — effective 2081
 ├── Version B — effective 2083
 └── Version C — effective future date
```

A new version never invalidates historical result calculations that used the old version.

## 5. Local curriculum

Local curriculum must be represented as a first-class authority/source rather than being appended as an untyped “extra subject”. CDC currently publishes guidance for local curriculum development and implementation, reinforcing the need for a configurable local-curriculum layer. citeturn257100search9

## 6. Subject combination

Grades/programs with compulsory and optional subject groups use a subject-combination engine with validation rules. No stream should be encoded as an irreversible list of subjects.

## 7. Technical/vocational curriculum

Curriculum records must support practical hours, labs, modules and competency-linked assessment so technical/vocational curriculum can be represented without a separate academic engine.

## 8. Curriculum ingestion

Supported authoritative ingestion modes:

1. Manual configuration
2. Approved structured import
3. Document-assisted data entry
4. Future official data/API adapters where contracted

Every imported curriculum should retain source metadata and effective date.

## 9. No content laundering rule

Akshar may link to official curriculum documents and preserve source references; it should not imply that a third-party transcription is the official authority document.

## Source basis and governance note

This document set is derived from the supplied SWASTHYA reference material, especially its engineering-contract structure, domain-boundary approach, tenancy/RLS philosophy, RBAC separation, real-data dashboard rules, auditability, interoperability boundaries, AI governance and evidence-based roadmap discipline. The supplied material explicitly structures the foundation around documents such as MASTER_RULES, PRODUCT_REQUIREMENTS, ARCHITECTURE, DATABASE, DESIGN_SYSTEM, SECURITY, TENANCY, API_CONTRACTS, TESTING_STRATEGY, DEPLOYMENT, DISASTER_RECOVERY, OBSERVABILITY, INTEROPERABILITY, AI_RULES and ROADMAP.

Nepal-specific education-domain assumptions are aligned to current official public sources from the Curriculum Development Center (CDC) and National Examination Board (NEB). CDC describes its responsibilities around school curriculum, curriculum materials and student-assessment frameworks, and its current catalogue includes curriculum materials across school grades and technical/vocational streams. NEB currently publishes examination schedules, results, policies, Grade 10 materials and Grade 11/12 materials/services.

External authority integration must remain adapter-based. No live API, automated government submission, compliance certification or official equivalence claim is considered implemented merely because an interface exists in Akshar.
