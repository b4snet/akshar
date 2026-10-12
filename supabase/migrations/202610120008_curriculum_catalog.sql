-- Migration: 202610120008_curriculum_catalog.sql
-- Description: Versioned curriculum catalog with per-row source traceability.
--
-- Adds:
--   * curriculum_sources    – registry of inspected official documents
--   * curriculum_versions   – curriculum/syllabus versions tied to sources
--   * source-traceability columns on units/chapters/topics
--     (source_number, source_locator, verification_status, curriculum_version_id)
--   * lesson provenance columns (topic_id, curriculum_version_id, review_status,
--     source_url) so original lessons and AI study aids stay distinguishable
--     from reviewed curriculum content
--   * topic_practice_questions – reviewed practice items owned by the platform
--     (separate from AI-generated lesson_practice_questions)
--   * curriculum_import_runs  – audit log of generated content imports
--
-- All changes are additive. No existing rows are modified or deleted, and
-- existing RLS policies keep applying; new tables are readable by
-- authenticated students and writable only through service-side imports.

begin;

-- ---------------------------------------------------------------------------
-- Source registry
-- ---------------------------------------------------------------------------
create table if not exists public.curriculum_sources (
  id uuid primary key,
  organization text not null,
  title text not null,
  url text not null,
  landing_url text,
  doc_year text not null,
  revision text,
  retrieved_at date not null,
  language text not null default 'English',
  license_note text not null,
  inspection_status text not null
    check (inspection_status in ('inspected-text-extracted', 'inspected-extraction-failed', 'discovered-not-inspected')),
  notes text not null default '',
  covers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.curriculum_versions (
  id uuid primary key,
  source_id uuid not null references public.curriculum_sources (id),
  name text not null,
  authority text not null,
  version_label text not null,
  effective_cycle text not null,
  language text not null default 'English',
  source_url text not null,
  verification_status text not null default 'official'
    check (verification_status in ('official', 'school-configured', 'unverified')),
  last_verified_at date not null,
  created_at timestamptz not null default now()
);

alter table public.curriculum_sources enable row level security;
alter table public.curriculum_versions enable row level security;

drop policy if exists "Students read curriculum sources" on public.curriculum_sources;
create policy "Students read curriculum sources"
  on public.curriculum_sources for select to authenticated
  using (true);

drop policy if exists "Students read curriculum versions" on public.curriculum_versions;
create policy "Students read curriculum versions"
  on public.curriculum_versions for select to authenticated
  using (true);

grant select on public.curriculum_sources to authenticated;
grant select on public.curriculum_versions to authenticated;

-- ---------------------------------------------------------------------------
-- Source traceability on the syllabus hierarchy
-- ---------------------------------------------------------------------------
alter table public.units
  add column if not exists source_number text,
  add column if not exists source_locator text,
  add column if not exists curriculum_version_id uuid references public.curriculum_versions (id),
  add column if not exists verification_status text not null default 'school-configured'
    check (verification_status in ('official', 'school-configured', 'unverified'));

alter table public.chapters
  add column if not exists part text,
  add column if not exists source_number text,
  add column if not exists source_locator text,
  add column if not exists curriculum_version_id uuid references public.curriculum_versions (id),
  add column if not exists verification_status text not null default 'school-configured'
    check (verification_status in ('official', 'school-configured', 'unverified'));

alter table public.topics
  add column if not exists source_number text,
  add column if not exists source_locator text,
  add column if not exists curriculum_version_id uuid references public.curriculum_versions (id),
  add column if not exists verification_status text not null default 'school-configured'
    check (verification_status in ('official', 'school-configured', 'unverified'));

create index if not exists units_subject_order_idx on public.units (subject_id, display_order);
create index if not exists chapters_unit_order_idx on public.chapters (unit_id, display_order);
create index if not exists topics_chapter_order_idx on public.topics (chapter_id, display_order);
create index if not exists topics_lesson_join_idx on public.topics (chapter_id);

-- ---------------------------------------------------------------------------
-- Lesson provenance
-- ---------------------------------------------------------------------------
alter table public.lessons
  add column if not exists topic_id uuid references public.topics (id),
  add column if not exists curriculum_version_id uuid references public.curriculum_versions (id),
  add column if not exists review_status text not null default 'sample'
    check (review_status in ('sample', 'original-reviewed', 'ai-generated', 'draft')),
  add column if not exists source_url text;

-- ---------------------------------------------------------------------------
-- Reviewed practice content (platform-authored; distinct from AI aids)
-- ---------------------------------------------------------------------------
create table if not exists public.topic_practice_questions (
  id uuid primary key,
  topic_id uuid not null references public.topics (id) on delete cascade,
  question text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) >= 2),
  answer_index smallint not null check (answer_index >= 0),
  explanation text not null default '',
  difficulty smallint check (difficulty between 1 and 5),
  source_locator text,
  review_status text not null default 'original-reviewed'
    check (review_status in ('original-reviewed', 'draft')),
  created_at timestamptz not null default now(),
  check (answer_index < jsonb_array_length(options))
);

alter table public.topic_practice_questions enable row level security;

drop policy if exists "Students read reviewed practice questions" on public.topic_practice_questions;
create policy "Students read reviewed practice questions"
  on public.topic_practice_questions for select to authenticated
  using (true);

grant select on public.topic_practice_questions to authenticated;
revoke all on public.topic_practice_questions from anon;

-- ---------------------------------------------------------------------------
-- Import audit log
-- ---------------------------------------------------------------------------
create table if not exists public.curriculum_import_runs (
  id uuid primary key,
  generated_by text not null,
  unit_count integer not null default 0,
  chapter_count integer not null default 0,
  topic_count integer not null default 0,
  source_files text not null default '',
  imported_at timestamptz not null default now()
);

alter table public.curriculum_import_runs enable row level security;

drop policy if exists "Students read import runs" on public.curriculum_import_runs;
create policy "Students read import runs"
  on public.curriculum_import_runs for select to authenticated
  using (true);

grant select on public.curriculum_import_runs to authenticated;
revoke all on public.curriculum_import_runs from anon;

commit;
