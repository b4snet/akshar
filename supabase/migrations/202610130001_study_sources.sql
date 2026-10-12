-- Migration: 202610130001_study_sources
-- Adds the study_sources table for the AI Study Workspace.
-- Stores user-uploaded files, extracted content, and processing status.
-- Private storage: each user's sources are owned by their auth.uid.

begin;

-- Drop the table if it already exists (idempotent re-run)
drop table if exists public.study_sources cascade;

create table public.study_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  title text not null,
  format text not null check (format in ('pdf', 'image', 'text', 'url')),
  status text not null default 'pending' check (status in ('pending', 'extracting', 'ready', 'failed')),
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  extracted_data jsonb null, -- stores extracted text, overview, keyPoints, pageCount, etc.
  storage_path text not null, -- path in Supabase Storage
  error_message text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.study_sources enable row level security;

-- RLS policy: users can only access their own sources
create policy "Users can CRUD their own study sources" on public.study_sources
  using (auth.uid() = user_id);

-- Index for faster lookups by user and status
create index idx_study_sources_user_id on public.study_sources (user_id);
create index idx_study_sources_status on public.study_sources (status);
create index idx_study_sources_format on public.study_sources (format);

-- Trigger to auto-update updated_at
create trigger handle_study_sources_updated_at
  before update on public.study_sources
  for each row
  execute function handle_updated_at();

comment on table public.study_sources is 'Stores user-uploaded study source files (PDF, image, text, URL) and their extraction/processing status for the AI Study Workspace.';

comment on column public.study_sources.user_id is 'Reference to the authenticated user who owns this source.';
comment on column public.study_sources.format is 'Type of source: pdf, image, text, or url.';
comment on column public.study_sources.status 'pending' = 'Queued for processing, not yet started';
comment on column public.study_sources.status 'extracting' = 'Currently being processed (extraction/transcription)';
comment on column public.study_sources.status 'ready' = 'Processing complete, extracted content available';
comment on column public.study_sources.status 'failed' = 'Processing failed, error_message contains details';
comment on column public.study_sources.extracted_data 'JSON: {title, overview, keyPoints, pageCount, ...}';
comment on column public.study_sources.storage_path 'Path in Supabase Storage bucket "study-sources"';
comment on column public.study_sources.error_message 'Human-readable error if status is "failed".';

end;