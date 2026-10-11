begin;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  grade smallint check (grade in (11, 12)),
  title text not null,
  description text not null default '',
  content jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  is_sample boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  progress_percent smallint not null default 0 check (progress_percent between 0 and 100),
  completed_at timestamptz,
  last_viewed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category text not null check (category in ('neb', 'cee', 'ioe')),
  quiz_title text not null,
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions > 0 and score <= total_questions),
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);

create table public.quiz_answer_keys (
  quiz_id text not null check (quiz_id in ('neb', 'cee', 'ioe')),
  category text not null check (category in ('neb', 'cee', 'ioe')),
  quiz_title text not null,
  question_index smallint not null check (question_index >= 0),
  option_count smallint not null check (option_count > 1),
  answer_index smallint not null check (answer_index >= 0 and answer_index < option_count),
  primary key (quiz_id, question_index)
);

create table public.study_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  activity_type text not null check (activity_type in ('lesson_opened', 'lesson_progressed', 'lesson_completed', 'quiz_completed')),
  details jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index lesson_progress_user_recent_idx on public.lesson_progress (user_id, updated_at desc);
create index quiz_attempts_user_recent_idx on public.quiz_attempts (user_id, completed_at desc);
create index study_activity_user_recent_idx on public.study_activity (user_id, occurred_at desc);
create index published_lessons_subject_grade_idx on public.lessons (subject, grade) where is_published = true;

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger lesson_progress_set_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();

insert into public.quiz_answer_keys (quiz_id, category, quiz_title, question_index, option_count, answer_index)
values
  ('neb', 'neb', 'NEB practice', 0, 4, 1),
  ('neb', 'neb', 'NEB practice', 1, 4, 2),
  ('neb', 'neb', 'NEB practice', 2, 4, 1),
  ('cee', 'cee', 'CEE preparation', 0, 4, 1),
  ('cee', 'cee', 'CEE preparation', 1, 4, 0),
  ('cee', 'cee', 'CEE preparation', 2, 4, 1),
  ('ioe', 'ioe', 'IOE preparation', 0, 4, 1),
  ('ioe', 'ioe', 'IOE preparation', 1, 4, 2),
  ('ioe', 'ioe', 'IOE preparation', 2, 4, 2)
on conflict (quiz_id, question_index) do nothing;

insert into public.lessons (id, subject, grade, title, description, content, is_published, is_sample)
values
  ('10000000-0000-4000-8000-000000000001', 'Physics', 11, 'Vectors and scalars', 'Sample lesson; not verified curriculum coverage.', '{"sample": true}'::jsonb, true, true),
  ('10000000-0000-4000-8000-000000000002', 'Chemistry', 11, 'Periodic classification', 'Sample lesson; not verified curriculum coverage.', '{"sample": true}'::jsonb, true, true),
  ('10000000-0000-4000-8000-000000000003', 'Mathematics', 12, 'Limits and continuity', 'Sample lesson; not verified curriculum coverage.', '{"sample": true}'::jsonb, true, true),
  ('10000000-0000-4000-8000-000000000004', 'Biology', 11, 'Cell structure and function', 'Sample lesson; not verified curriculum coverage.', '{"sample": true}'::jsonb, true, true)
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_answer_keys enable row level security;
alter table public.study_activity enable row level security;

create policy "Profiles are readable by their owner"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Profiles are updateable by their owner"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Published lessons are readable"
  on public.lessons for select to anon, authenticated
  using (is_published = true);

create policy "Users manage their own lesson progress"
  on public.lesson_progress for all to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.lessons
      where lessons.id = lesson_progress.lesson_id and lessons.is_published = true
    )
  );

create policy "Users can read their own quiz attempts"
  on public.quiz_attempts for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can read their own study activity"
  on public.study_activity for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own study activity"
  on public.study_activity for insert to authenticated
  with check ((select auth.uid()) = user_id);

grant select on public.lessons to anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;
grant select, insert, update, delete on public.lesson_progress to authenticated;
grant select on public.quiz_attempts to authenticated;
grant select, insert on public.study_activity to authenticated;
revoke all on public.quiz_answer_keys from public, anon, authenticated;

create function public.submit_quiz_attempt(p_quiz_id text, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_category text;
  v_quiz_title text;
  v_total integer;
  v_score integer;
  v_attempt_id uuid;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_answers is null or jsonb_typeof(p_answers) <> 'array' then
    raise exception 'Answers must be a JSON array' using errcode = '22023';
  end if;

  select min(answer_key.category), min(answer_key.quiz_title), count(*)::integer
    into v_category, v_quiz_title, v_total
    from public.quiz_answer_keys as answer_key
    where answer_key.quiz_id = p_quiz_id;

  if v_total = 0 then
    raise exception 'Quiz not found' using errcode = '22023';
  end if;

  if jsonb_array_length(p_answers) <> v_total then
    raise exception 'Answer count does not match quiz' using errcode = '22023';
  end if;

  if exists (
    select 1
      from jsonb_array_elements(p_answers) with ordinality as submitted(value, answer_order)
      left join public.quiz_answer_keys as answer_key
        on answer_key.quiz_id = p_quiz_id
        and answer_key.question_index = (submitted.answer_order - 1)::smallint
      where answer_key.question_index is null
        or case
          when jsonb_typeof(submitted.value) = 'number' and submitted.value::text ~ '^[0-9]+$'
            then submitted.value::text::integer
          else -1
        end < 0
        or case
          when jsonb_typeof(submitted.value) = 'number' and submitted.value::text ~ '^[0-9]+$'
            then submitted.value::text::integer
          else -1
        end >= answer_key.option_count
  ) then
    raise exception 'Answer selection is invalid' using errcode = '22023';
  end if;

  with submitted as (
    select (answer_order - 1)::smallint as question_index,
      case
        when jsonb_typeof(value) = 'number' and value::text ~ '^[0-9]+$' then value::text::integer
        else -1
      end as selected_index
    from jsonb_array_elements(p_answers) with ordinality as answer(value, answer_order)
  )
  select count(*) filter (where submitted.selected_index = answer_key.answer_index)::integer
    into v_score
    from submitted
    join public.quiz_answer_keys as answer_key
      on answer_key.quiz_id = p_quiz_id
      and answer_key.question_index = submitted.question_index;

  insert into public.quiz_attempts (user_id, category, quiz_title, score, total_questions, answers)
    values (v_user_id, v_category, v_quiz_title, v_score, v_total, p_answers)
    returning id into v_attempt_id;

  insert into public.study_activity (user_id, activity_type, details)
    values (v_user_id, 'quiz_completed', jsonb_build_object('quiz_attempt_id', v_attempt_id, 'category', v_category));

  return jsonb_build_object('attempt_id', v_attempt_id, 'score', v_score, 'total_questions', v_total);
end;
$$;

revoke all on function public.submit_quiz_attempt(text, jsonb) from public, anon, authenticated;
grant execute on function public.submit_quiz_attempt(text, jsonb) to authenticated;

create function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'display_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user_profile() from public, anon, authenticated;

create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

insert into public.profiles (id, email, display_name)
select
  users.id,
  users.email,
  nullif(users.raw_user_meta_data ->> 'display_name', '')
from auth.users as users
on conflict (id) do nothing;

commit;
