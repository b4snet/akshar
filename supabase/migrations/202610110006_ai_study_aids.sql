-- Migration: 202610110006_ai_study_aids.sql
-- Description: Owner-only storage for AI-generated study aids plus a
-- generation log used for per-user rate limiting. Non-destructive: creates
-- new tables only; touches no existing rows.

begin;

-- Saved flashcard decks: one per user per lesson (regeneration replaces).
create table if not exists public.lesson_flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  cards jsonb not null,
  provider text not null,
  model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- Saved AI summaries: one per user per lesson.
create table if not exists public.lesson_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  summary jsonb not null,
  provider text not null,
  model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- Saved AI practice questions: one set per user per lesson.
create table if not exists public.lesson_practice_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  questions jsonb not null,
  provider text not null,
  model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- Generation log for per-user abuse protection. Appends only; used to count
-- recent generations per user in the server actions.
create table if not exists public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('flashcards', 'summary', 'practice_questions', 'tutor')),
  provider text not null,
  model text not null,
  created_at timestamptz not null default now()
);

create index if not exists ai_generations_user_recent_idx on public.ai_generations (user_id, created_at desc);
create index if not exists lesson_flashcards_user_idx on public.lesson_flashcards (user_id);
create index if not exists lesson_summaries_user_idx on public.lesson_summaries (user_id);
create index if not exists lesson_practice_questions_user_idx on public.lesson_practice_questions (user_id);

alter table public.lesson_flashcards enable row level security;
alter table public.lesson_summaries enable row level security;
alter table public.lesson_practice_questions enable row level security;
alter table public.ai_generations enable row level security;

-- Owner-only policies. Students can never read another student's saved
-- flashcards, summaries, practice sets, or generation history.
drop policy if exists "Owners manage their flashcards" on public.lesson_flashcards;
create policy "Owners manage their flashcards"
  on public.lesson_flashcards for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Owners manage their summaries" on public.lesson_summaries;
create policy "Owners manage their summaries"
  on public.lesson_summaries for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Owners manage their practice questions" on public.lesson_practice_questions;
create policy "Owners manage their practice questions"
  on public.lesson_practice_questions for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Owners read their generations" on public.ai_generations;
create policy "Owners read their generations"
  on public.ai_generations for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Owners log their generations" on public.ai_generations;
create policy "Owners log their generations"
  on public.ai_generations for insert to authenticated
  with check ((select auth.uid()) = user_id);

-- Anonymous clients get nothing from these tables.
revoke all on public.lesson_flashcards from anon;
revoke all on public.lesson_summaries from anon;
revoke all on public.lesson_practice_questions from anon;
revoke all on public.ai_generations from anon;

grant select, insert, update, delete on public.lesson_flashcards to authenticated;
grant select, insert, update, delete on public.lesson_summaries to authenticated;
grant select, insert, update, delete on public.lesson_practice_questions to authenticated;
grant select, insert on public.ai_generations to authenticated;

drop trigger if exists lesson_flashcards_set_updated_at on public.lesson_flashcards;
create trigger lesson_flashcards_set_updated_at
  before update on public.lesson_flashcards
  for each row execute function public.set_updated_at();

drop trigger if exists lesson_summaries_set_updated_at on public.lesson_summaries;
create trigger lesson_summaries_set_updated_at
  before update on public.lesson_summaries
  for each row execute function public.set_updated_at();

drop trigger if exists lesson_practice_questions_set_updated_at on public.lesson_practice_questions;
create trigger lesson_practice_questions_set_updated_at
  before update on public.lesson_practice_questions
  for each row execute function public.set_updated_at();

commit;
