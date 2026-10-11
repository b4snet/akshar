-- Migration: 202610110007_subject_eligibility.sql
-- Description: Non-destructive curriculum corrections for grade/stream
-- filtering and entrance-preparation tracking.
--
-- Source basis (inspected 2026-10-11):
--   * CDC "Secondary Education Curriculum 2077, Grade 11-12 Part 1
--     (Compulsory Subjects), updated" — Nepali (Nep. 001/002) and English
--     (Eng. 003/004) are the compulsory subjects for both grades.
--       https://giwmscdnone.gov.np/media/pdf_upload/Secondary%20Education%20Curriculum%2C%202077%20Grade%2011-12%20Part%201%20(Compulsory%20Subject)%20-%20Updated_rglgnsv.pdf
--   * CDC "Secondary Education Curriculum 2076, Grade 11-12 Part 2
--     (Optional Subjects)" — official catalogue with codes: Physics
--     Phy. 101/102, Chemistry Che. 301/302, Biology Bio. 201/202, Accountancy
--     Acc. 103/104, Business Studies Bus. 215/216, Economics Eco. 303/304.
--       https://giwmscdnone.gov.np/media/pdf_upload/Secondary%20Education%20Curriculum%2C2076%20Grade%2011-12%20Part%202%20(Optional%20Subject)_25lxbj8.pdf
--   * IOE B.E./B.Arch. Entrance syllabus 2083 (updated 2026-07-07):
--     Mathematics 50 marks, Physics 40, Chemistry 30, English 20 (total 140).
--       https://portal.tu.edu.np/downloads/download3_2026_07_07_22_05_05.pdf
--   * MEC "Syllabus for Bachelor Level Common Entrance Examination 2020
--     (revised 2026)": Zoology 40 + Botany 40, Chemistry 50, Physics 50,
--     Mental Agility Test 20 (200 questions total).
--       https://mec.gov.np/uploads/shares/curriculumn/syllabus_bachelor_program_revised__2026.pdf
--
-- What is NOT claimed: the inspected official sources publish a compulsory
-- volume and an optional-subject catalogue. They do NOT establish fixed
-- national "Science/Management" stream combinations — those are school-level
-- groupings. Stream-placed subjects are therefore seeded with
-- verification_status = 'school-configured', not 'official'.
--
-- verification_status semantics:
--   'official'           – placement supported by an inspected official source
--   'school-configured'  – placement reflects common school practice or
--                          prototype data; not confirmed by an official source
--   'unverified'         – placeholder recorded for review

begin;

-- ---------------------------------------------------------------------------
-- Schema additions to subjects (all additive; existing rows keep working).
-- ---------------------------------------------------------------------------
alter table public.subjects
  add column if not exists grade_id uuid references public.grades (id),
  add column if not exists compulsory boolean not null default false,
  add column if not exists curriculum_version text,
  add column if not exists source_url text,
  add column if not exists marks integer,
  add column if not exists verification_status text not null default 'school-configured'
    check (verification_status in ('official', 'school-configured', 'unverified'));

-- Compulsory subjects hang off the grade (they apply to every stream).
alter table public.subjects alter column stream_id drop not null;

-- A subject is either stream-scoped, or a grade-level compulsory subject.
alter table public.subjects drop constraint if exists subjects_scope_check;
alter table public.subjects
  add constraint subjects_scope_check
  check (stream_id is not null or (grade_id is not null and compulsory));

-- ---------------------------------------------------------------------------
-- Student selection: persists grade/curriculum/stream so the backend can
-- validate eligibility server-side, not only in the UI.
-- ---------------------------------------------------------------------------
create table if not exists public.student_selections (
  user_id uuid primary key references auth.users (id) on delete cascade,
  education_level text not null default 'NEB',
  grade text not null,
  stream text,
  updated_at timestamptz not null default now()
);

alter table public.student_selections enable row level security;

drop policy if exists "Owners manage their selection" on public.student_selections;
create policy "Owners manage their selection"
  on public.student_selections for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

revoke all on public.student_selections from anon;
grant select, insert, update, delete on public.student_selections to authenticated;

-- ---------------------------------------------------------------------------
-- Compulsory subjects (official: CDC Part 1, compulsory volume).
-- ---------------------------------------------------------------------------
insert into public.subjects (id, stream_id, grade_id, name, code, compulsory, display_order, curriculum_version, source_url, verification_status)
values
  ('b0000000-0000-4000-8000-000000000001', null, '22222222-2222-2222-2222-222222222222', 'Nepali',    'Nep. 001', true, 1, 'CDC Grade 11-12, 2077 (compulsory volume)', 'https://moecdc.gov.np/content/160/secondary-education-curriculum--2077-grade-11-12-part/', 'official'),
  ('b0000000-0000-4000-8000-000000000002', null, '33333333-3333-3333-3333-333333333333', 'Nepali',    'Nep. 002', true, 1, 'CDC Grade 11-12, 2077 (compulsory volume)', 'https://moecdc.gov.np/content/160/secondary-education-curriculum--2077-grade-11-12-part/', 'official'),
  ('b0000000-0000-4000-8000-000000000003', null, '22222222-2222-2222-2222-222222222222', 'English',   'Eng. 003', true, 2, 'CDC Grade 11-12, 2077 (compulsory volume)', 'https://moecdc.gov.np/content/160/secondary-education-curriculum--2077-grade-11-12-part/', 'official'),
  ('b0000000-0000-4000-8000-000000000004', null, '33333333-3333-3333-3333-333333333333', 'English',   'Eng. 004', true, 2, 'CDC Grade 11-12, 2077 (compulsory volume)', 'https://moecdc.gov.np/content/160/secondary-education-curriculum--2077-grade-11-12-part/', 'official')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Existing grade-11 Science prototype rows: record official codes where the
-- optional-subject catalogue confirms them; mark placement school-level.
-- Mathematics stays 'unverified': the catalogue contains both a compulsory
-- volume maths (MTH. 007/008, an alternative to Social Studies per NCF 2076)
-- and an optional maths (Mat. 401/402), so a single code cannot be asserted.
-- ---------------------------------------------------------------------------
update public.subjects set code = 'Phy. 101', curriculum_version = 'CDC Grade 11-12, 2076 (optional subject catalogue)', source_url = 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', verification_status = 'school-configured' where id = '88888888-8888-8888-8888-888888888888';
update public.subjects set code = 'Che. 301', curriculum_version = 'CDC Grade 11-12, 2076 (optional subject catalogue)', source_url = 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', verification_status = 'school-configured' where id = '99999999-9999-9999-9999-999999999999';
update public.subjects set code = 'Bio. 201', curriculum_version = 'CDC Grade 11-12, 2076 (optional subject catalogue)', source_url = 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', verification_status = 'school-configured' where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
update public.subjects set code = null, verification_status = 'unverified', source_url = null where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- ---------------------------------------------------------------------------
-- Grade 12 Science (mirrors the grade-11 school grouping; same caveat).
-- ---------------------------------------------------------------------------
insert into public.subjects (id, stream_id, name, code, optional, display_order, curriculum_version, source_url, verification_status)
values
  ('c1000000-0000-4000-8000-000000000001', '66666666-6666-6666-6666-666666666666', 'Physics',    'Phy. 102', false, 1, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c1000000-0000-4000-8000-000000000002', '66666666-6666-6666-6666-666666666666', 'Chemistry',  'Che. 302', false, 2, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c1000000-0000-4000-8000-000000000003', '66666666-6666-6666-6666-666666666666', 'Biology',    'Bio. 202', false, 3, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c1000000-0000-4000-8000-000000000004', '66666666-6666-6666-6666-666666666666', 'Mathematics', null,     false, 4, null, null, 'unverified')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Management stream, both grades (school grouping; subjects themselves are in
-- the official optional catalogue with verified codes).
-- ---------------------------------------------------------------------------
insert into public.subjects (id, stream_id, name, code, optional, display_order, curriculum_version, source_url, verification_status)
values
  ('c2000000-0000-4000-8000-000000000001', '55555555-5555-5555-5555-555555555555', 'Accountancy',    'Acc. 103', false, 1, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c2000000-0000-4000-8000-000000000002', '55555555-5555-5555-5555-555555555555', 'Economics',      'Eco. 303', false, 2, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c2000000-0000-4000-8000-000000000003', '55555555-5555-5555-5555-555555555555', 'Business Studies', 'Bus. 215', false, 3, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c2000000-0000-4000-8000-000000000004', '55555555-5555-5555-5555-555555555555', 'Mathematics',    null,      true,  4, null, null, 'unverified'),
  ('c2000000-0000-4000-8000-000000000005', '77777777-7777-7777-7777-777777777777', 'Accountancy',    'Acc. 104', false, 1, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c2000000-0000-4000-8000-000000000006', '77777777-7777-7777-7777-777777777777', 'Economics',      'Eco. 304', false, 2, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c2000000-0000-4000-8000-000000000007', '77777777-7777-7777-7777-777777777777', 'Business Studies', 'Bus. 216', false, 3, 'CDC Grade 11-12, 2076 (optional subject catalogue)', 'https://moecdc.gov.np/content/159/secondary-education-curriculum-2076-grade-11-12-part-2/', 'school-configured'),
  ('c2000000-0000-4000-8000-000000000008', '77777777-7777-7777-7777-777777777777', 'Mathematics',    null,      true,  4, null, null, 'unverified')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Entrance preparation, modelled as its own education level so it is never
-- conflated with school streams. Marks are the official question counts /
-- full marks from the inspected syllabi.
-- ---------------------------------------------------------------------------
insert into public.education_levels (id, name, display_order)
values ('ab000000-0000-4000-8000-000000000001', 'Entrance Preparation', 2)
on conflict (id) do nothing;

insert into public.grades (id, education_level_id, name, display_order)
values
  ('ab000000-0000-4000-8000-000000000002', 'ab000000-0000-4000-8000-000000000001', 'IOE', 1),
  ('ab000000-0000-4000-8000-000000000003', 'ab000000-0000-4000-8000-000000000001', 'CEE', 2)
on conflict (id) do nothing;

insert into public.streams (id, grade_id, name, display_order)
values
  ('ab000000-0000-4000-8000-000000000004', 'ab000000-0000-4000-8000-000000000002', 'IOE entrance (B.E./B.Arch.)', 1),
  ('ab000000-0000-4000-8000-000000000005', 'ab000000-0000-4000-8000-000000000003', 'CEE entrance (MBBS/BDS/BSc Nursing)', 1)
on conflict (id) do nothing;

insert into public.subjects (id, stream_id, name, code, optional, display_order, marks, curriculum_version, source_url, verification_status)
values
  ('ab000000-0000-4000-8000-000000000011', 'ab000000-0000-4000-8000-000000000004', 'Mathematics', 'IOE-Math',  false, 1, 50, 'IOE B.E./B.Arch. Entrance syllabus 2083 (updated 2026-07-07)', 'https://ioe.tu.edu.np/downloads?category=445', 'official'),
  ('ab000000-0000-4000-8000-000000000012', 'ab000000-0000-4000-8000-000000000004', 'Physics',     'IOE-Phy',   false, 2, 40, 'IOE B.E./B.Arch. Entrance syllabus 2083 (updated 2026-07-07)', 'https://ioe.tu.edu.np/downloads?category=445', 'official'),
  ('ab000000-0000-4000-8000-000000000013', 'ab000000-0000-4000-8000-000000000004', 'Chemistry',   'IOE-Che',   false, 3, 30, 'IOE B.E./B.Arch. Entrance syllabus 2083 (updated 2026-07-07)', 'https://ioe.tu.edu.np/downloads?category=445', 'official'),
  ('ab000000-0000-4000-8000-000000000014', 'ab000000-0000-4000-8000-000000000004', 'English',     'IOE-Eng',   false, 4, 20, 'IOE B.E./B.Arch. Entrance syllabus 2083 (updated 2026-07-07)', 'https://ioe.tu.edu.np/downloads?category=445', 'official'),
  ('ab000000-0000-4000-8000-000000000021', 'ab000000-0000-4000-8000-000000000005', 'Biology (Zoology + Botany)', 'CEE-Bio', false, 1, 80, 'MEC Bachelor Level CEE syllabus 2020 (revised 2026)', 'https://mec.gov.np/en/syllabus', 'official'),
  ('ab000000-0000-4000-8000-000000000022', 'ab000000-0000-4000-8000-000000000005', 'Chemistry',   'CEE-Che',   false, 2, 50, 'MEC Bachelor Level CEE syllabus 2020 (revised 2026)', 'https://mec.gov.np/en/syllabus', 'official'),
  ('ab000000-0000-4000-8000-000000000023', 'ab000000-0000-4000-8000-000000000005', 'Physics',     'CEE-Phy',   false, 3, 50, 'MEC Bachelor Level CEE syllabus 2020 (revised 2026)', 'https://mec.gov.np/en/syllabus', 'official'),
  ('ab000000-0000-4000-8000-000000000024', 'ab000000-0000-4000-8000-000000000005', 'Mental Agility Test', 'CEE-MAT', false, 4, 20, 'MEC Bachelor Level CEE syllabus 2020 (revised 2026)', 'https://mec.gov.np/en/syllabus', 'official')
on conflict (id) do nothing;

commit;
