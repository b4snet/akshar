-- Migration: 202610110002_curriculum_schema.sql
-- Description: Curriculum hierarchy tables for NEB education platform

-- Education levels (e.g., "NEB")
create table education_levels (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  display_order int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Grades (e.g., 11, 12)
create table grades (
  id uuid primary key default gen_random_uuid(),
  education_level_id uuid not null references education_levels(id) on delete cascade,
  name text not null,
  display_order int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (education_level_id, name)
);

-- Streams (Science, Management, etc.)
create table streams (
  id uuid primary key default gen_random_uuid(),
  grade_id uuid not null references grades(id) on delete cascade,
  name text not null,
  display_order int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (grade_id, name)
);

-- Subjects (Physics, Chemistry, ...)
create table subjects (
  id uuid primary key default gen_random_uuid(),
  stream_id uuid not null references streams(id) on delete cascade,
  name text not null,
  code text,
  optional boolean default false,
  display_order int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (stream_id, name)
);

-- Units (groupings within a subject)
create table units (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  title text not null,
  description text,
  display_order int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Chapters (within a unit)
create table chapters (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references units(id) on delete cascade,
  title text not null,
  description text,
  display_order int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Topics (fine‑grained learning objects)
create table topics (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id) on delete cascade,
  title text not null,
  objectives text,
  language enum('en','np') default 'en',
  difficulty int check (difficulty between 1 and 5),
  display_order int not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Learning resources (article, video, pdf, image)
create table learning_resources (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references topics(id) on delete cascade,
  type enum('article','video','pdf','image') not null,
  title text not null,
  url text not null,
  language enum('en','np') default 'en',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Assessments (quiz or test linked to a topic)
create table assessments (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references topics(id) on delete cascade,
  name text not null,
  description text,
  max_score int not null default 0,
  passing_score int,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable row‑level security for all new tables
alter table education_levels enable row level security;
alter table grades enable row level security;
alter table streams enable row level security;
alter table subjects enable row level security;
alter table units enable row level security;
alter table chapters enable row level security;
alter table topics enable row level security;
alter table learning_resources enable row level security;
alter table assessments enable row level security;

-- Simple SELECT policy for any authenticated user
create policy "authenticated can select" on education_levels for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on grades for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on streams for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on subjects for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on units for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on chapters for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on topics for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on learning_resources for select using (auth.role() = 'authenticated');
create policy "authenticated can select" on assessments for select using (auth.role() = 'authenticated');

-- INSERT/UPDATE/DELETE policies for teachers (role = 'teacher')
create policy "teacher can modify" on education_levels for all using (auth.role() = 'teacher');
create policy "teacher can modify" on grades for all using (auth.role() = 'teacher');
create policy "teacher can modify" on streams for all using (auth.role() = 'teacher');
create policy "teacher can modify" on subjects for all using (auth.role() = 'teacher');
create policy "teacher can modify" on units for all using (auth.role() = 'teacher');
create policy "teacher can modify" on chapters for all using (auth.role() = 'teacher');
create policy "teacher can modify" on topics for all using (auth.role() = 'teacher');
create policy "teacher can modify" on learning_resources for all using (auth.role() = 'teacher');
create policy "teacher can modify" on assessments for all using (auth.role() = 'teacher');

-- End of migration
