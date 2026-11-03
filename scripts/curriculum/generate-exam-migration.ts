import fs from "node:fs";
import path from "node:path";
import { idFor } from "./lib";

const LESSONS_FILE = path.resolve(process.cwd(), "curriculum/data/lessons.json");
const MIGRATION_FILE = path.resolve(process.cwd(), "supabase/migrations/202610150001_exam_persistence_and_reliability.sql");

interface PracticeQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  difficulty?: number;
}

interface LessonRecord {
  idKey: string;
  pathwayFile: string;
  subjectRef?: { subject: string };
  title: string;
  practice?: PracticeQuestion[];
}

function escapeSql(str: string): string {
  return str.replace(/'/g, "''");
}

function escapeJson(obj: unknown): string {
  return escapeSql(JSON.stringify(obj));
}

export function generateMigration(): void {
  const lessonsData = JSON.parse(fs.readFileSync(LESSONS_FILE, "utf8")) as { lessons: LessonRecord[] };
  const lessons = lessonsData.lessons;

  const configs = [
    {
      id: idFor("exam-config", "neb-practice"),
      slug: "neb-practice",
      name: "NEB Practice Exam (Sample)",
      exam_type: "neb",
      year: "2077 (Practice)",
      duration_minutes: 60,
      total_questions: 30,
      marks_per_correct: 1,
      marks_per_incorrect: 0,
      marks_per_unanswered: 0,
      negative_marking: false,
      allowed_unanswered: true,
      verification_status: "practice",
      source_ref: "NEB Practice Questions (Sample)",
      effective_year: "2077",
      syllabus_version: "practice",
      description: "NEB practice exam with 30 sample questions across Physics, Chemistry, Biology. No negative marking.",
      subject_distribution: { physics: 10, chemistry: 10, biology: 10 },
      pathwayFilter: (p: string) => p.startsWith("neb-"),
    },
    {
      id: idFor("exam-config", "cee-practice"),
      slug: "cee-practice",
      name: "CEE Practice Exam (Sample)",
      exam_type: "cee",
      year: "2020r2026 (Practice)",
      duration_minutes: 60,
      total_questions: 45,
      marks_per_correct: 1,
      marks_per_incorrect: 0,
      marks_per_unanswered: 0,
      negative_marking: false,
      allowed_unanswered: true,
      verification_status: "practice",
      source_ref: "CEE Practice Questions (Sample)",
      effective_year: "2026",
      syllabus_version: "practice",
      description: "CEE practice exam with 45 sample questions across Biology, Chemistry, Physics. No negative marking.",
      subject_distribution: { biology: 20, chemistry: 15, physics: 10 },
      pathwayFilter: (p: string) => p === "cee-entrance" || p === "neb-biology-2076" || p === "neb-chemistry-2076",
    },
    {
      id: idFor("exam-config", "ioe-practice"),
      slug: "ioe-practice",
      name: "IOE Practice Exam (Sample)",
      exam_type: "ioe",
      year: "2083 (Practice)",
      duration_minutes: 45,
      total_questions: 35,
      marks_per_correct: 1,
      marks_per_incorrect: 0,
      marks_per_unanswered: 0,
      negative_marking: false,
      allowed_unanswered: true,
      verification_status: "practice",
      source_ref: "IOE Practice Questions (Sample)",
      effective_year: "2083",
      syllabus_version: "practice",
      description: "IOE practice exam with 35 sample questions across Mathematics, Physics, Chemistry. No negative marking.",
      subject_distribution: { mathematics: 15, physics: 10, chemistry: 10 },
      pathwayFilter: (p: string) => p === "ioe-entrance" || p === "neb-physics-2076" || p === "neb-chemistry-2076",
    },
    {
      id: idFor("exam-config", "neb-2077"),
      slug: "neb-2077",
      name: "NEB Grade 11-12 Examination 2077 (Updated)",
      exam_type: "neb",
      year: "2077",
      duration_minutes: 180,
      total_questions: 60,
      marks_per_correct: 1,
      marks_per_incorrect: -0.25,
      marks_per_unanswered: 0,
      negative_marking: true,
      allowed_unanswered: true,
      verification_status: "official",
      source_ref: "CDC Secondary Education Curriculum 2077, Grade 11-12 Part 1 & 2",
      effective_year: "2077",
      syllabus_version: "2077 updated",
      description: "Official NEB Grade 11-12 examination following CDC 2077 curriculum with negative marking.",
      subject_distribution: { physics: 25, chemistry: 20, biology: 15 },
      pathwayFilter: (p: string) => p.startsWith("neb-"),
    },
    {
      id: idFor("exam-config", "cee-2020r2026"),
      slug: "cee-2020r2026",
      name: "MEC CEE Medical Entrance 2020 (Revised 2026)",
      exam_type: "cee",
      year: "2020 (revised 2026)",
      duration_minutes: 180,
      total_questions: 60,
      marks_per_correct: 1,
      marks_per_incorrect: -0.25,
      marks_per_unanswered: 0,
      negative_marking: true,
      allowed_unanswered: true,
      verification_status: "official",
      source_ref: "MEC Bachelor Level Common Entrance Examination Syllabus 2020 (revised 2026)",
      effective_year: "2026",
      syllabus_version: "2020 revised 2026",
      description: "MEC CEE medical entrance exam with negative marking.",
      subject_distribution: { biology: 25, chemistry: 20, physics: 15 },
      pathwayFilter: (p: string) => p === "cee-entrance" || p === "neb-biology-2076" || p === "neb-chemistry-2076",
    },
    {
      id: idFor("exam-config", "ioe-2083"),
      slug: "ioe-2083",
      name: "IOE B.E./B.Arch. Entrance 2083 (Updated 2026)",
      exam_type: "ioe",
      year: "2083 (updated 2026-07-07)",
      duration_minutes: 120,
      total_questions: 50,
      marks_per_correct: 1,
      marks_per_incorrect: -0.25,
      marks_per_unanswered: 0,
      negative_marking: true,
      allowed_unanswered: true,
      verification_status: "official",
      source_ref: "IOE B.E./B.Arch. Entrance Syllabus 2083 (updated 2026-07-07)",
      effective_year: "2083",
      syllabus_version: "2083 updated",
      description: "IOE Engineering Entrance exam with negative marking.",
      subject_distribution: { mathematics: 20, physics: 15, chemistry: 15 },
      pathwayFilter: (p: string) => p === "ioe-entrance" || p === "neb-physics-2076" || p === "neb-chemistry-2076",
    },
  ];

  const sql: string[] = [
    "-- Migration: 202610150001_exam_persistence_and_reliability.sql",
    "-- Description: Exam attempt persistence, database-backed state, answer recovery, and storage provisioning",
    "-- Phase 1: Reliability, Database Persistence & Architectural Stabilization",
    "",
    "begin;",
    "",
    "-- 1. Schema enhancement: Add is_flagged to exam_answers for review workflow",
    "alter table public.exam_answers add column if not exists is_flagged boolean not null default false;",
    "",
    "-- 2. Performance indexes for serverless query efficiency",
    "create index if not exists idx_exam_answers_attempt_updated on public.exam_answers (attempt_id, updated_at);",
    "create index if not exists idx_quiz_attempts_user_created on public.quiz_attempts (user_id, created_at);",
    "create index if not exists idx_study_activity_user_created on public.study_activity (user_id, occurred_at);",
    "",
    "-- 3. Upsert exam configs catalog",
  ];

  for (const c of configs) {
    sql.push(
      `insert into public.exam_configs (id, name, exam_type, year, duration_minutes, total_questions, marks_per_correct, marks_per_incorrect, marks_per_unanswered, negative_marking, allowed_unanswered, verification_status, source_ref, effective_year, syllabus_version, description, subject_distribution)`,
      `values ('${c.id}', '${escapeSql(c.name)}', '${c.exam_type}', '${escapeSql(c.year)}', ${c.duration_minutes}, ${c.total_questions}, ${c.marks_per_correct}, ${c.marks_per_incorrect}, ${c.marks_per_unanswered}, ${c.negative_marking}, ${c.allowed_unanswered}, '${c.verification_status}', '${escapeSql(c.source_ref)}', '${escapeSql(c.effective_year)}', '${escapeSql(c.syllabus_version)}', '${escapeSql(c.description)}', '${escapeJson(c.subject_distribution)}'::jsonb)`,
      `on conflict (id) do update set`,
      `  name = excluded.name, duration_minutes = excluded.duration_minutes, total_questions = excluded.total_questions, marks_per_correct = excluded.marks_per_correct, marks_per_incorrect = excluded.marks_per_incorrect, negative_marking = excluded.negative_marking, description = excluded.description, subject_distribution = excluded.subject_distribution, updated_at = now();`,
      ""
    );
  }

  sql.push("-- 4. Seed verified exam questions");
  let questionInsertCount = 0;

  for (const c of configs) {
    const matchingLessons = lessons.filter((l) => c.pathwayFilter(l.pathwayFile));
    let order = 1;
    for (const lesson of matchingLessons) {
      if (!lesson.practice || lesson.practice.length === 0) continue;
      for (const [qIdx, q] of lesson.practice.entries()) {
        const qId = idFor("exam-question", c.id, lesson.idKey, String(qIdx));
        let subject = "General";
        if (lesson.pathwayFile.includes("physics")) subject = "Physics";
        else if (lesson.pathwayFile.includes("chemistry")) subject = "Chemistry";
        else if (lesson.pathwayFile.includes("biology")) subject = "Biology";
        else if (lesson.pathwayFile.includes("ioe")) subject = "Mathematics";
        else if (lesson.pathwayFile.includes("cee")) subject = "Biology";

        sql.push(
          `insert into public.exam_questions (id, exam_config_id, prompt, options, answer, explanation, subject, topic, difficulty, source_ref, verification_status, display_order)`,
          `values ('${qId}', '${c.id}', '${escapeSql(q.question)}', '${escapeJson(q.options)}'::jsonb, ${q.answerIndex}, '${escapeSql(q.explanation || "")}', '${escapeSql(subject)}', '${escapeSql(lesson.title)}', ${q.difficulty ?? 2}, '${escapeSql(c.source_ref)}', '${c.verification_status === "official" ? "official" : "school-configured"}', ${order})`,
          `on conflict (id) do update set prompt = excluded.prompt, options = excluded.options, answer = excluded.answer, explanation = excluded.explanation, subject = excluded.subject, topic = excluded.topic, display_order = excluded.display_order, updated_at = now();`
        );
        order += 1;
        questionInsertCount += 1;
        if (order > c.total_questions) break;
      }
      if (order > c.total_questions) break;
    }
    sql.push("");
  }

  sql.push(
    "-- 5. Improved start_exam_attempt RPC: atomic check, deadline calculation fix, active attempt resumption",
    `create or replace function public.start_exam_attempt(p_exam_config_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_config public.exam_configs%rowtype;
  v_deadline timestamptz;
  v_attempt_id uuid;
  v_snapshot jsonb;
  v_actual_questions int;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into v_config from public.exam_configs where id = p_exam_config_id;
  if not found then
    raise exception 'Exam config not found' using errcode = '22023';
  end if;

  -- 1. Resumption: If student has an active, unexpired attempt for this config, return it
  select id, deadline into v_attempt_id, v_deadline
  from public.exam_attempts
  where user_id = v_user_id
    and exam_config_id = p_exam_config_id
    and status in ('ready', 'in_progress')
    and deadline > now()
  order by started_at desc
  limit 1;

  if found then
    return jsonb_build_object('attempt_id', v_attempt_id, 'deadline', v_deadline, 'status', 'in_progress');
  end if;

  -- 2. Mark any expired pending attempts as expired
  update public.exam_attempts
  set status = 'expired'
  where user_id = v_user_id
    and exam_config_id = p_exam_config_id
    and status in ('ready', 'in_progress')
    and deadline <= now();

  -- 3. Calculate deadline cleanly using coalesce
  v_deadline := now() + (coalesce(v_config.duration_minutes, 120)) * interval '1 minute';

  v_snapshot := jsonb_build_object(
    'id', v_config.id,
    'name', v_config.name,
    'exam_type', v_config.exam_type,
    'year', v_config.year,
    'duration_minutes', v_config.duration_minutes,
    'total_questions', v_config.total_questions,
    'questions_per_subject', v_config.questions_per_subject,
    'marks_per_correct', v_config.marks_per_correct,
    'marks_per_incorrect', v_config.marks_per_incorrect,
    'marks_per_unanswered', v_config.marks_per_unanswered,
    'negative_marking', v_config.negative_marking,
    'allowed_unanswered', v_config.allowed_unanswered,
    'passing_score', v_config.passing_score,
    'verification_status', v_config.verification_status,
    'source_ref', v_config.source_ref,
    'effective_year', v_config.effective_year,
    'syllabus_version', v_config.syllabus_version,
    'description', v_config.description,
    'subject_distribution', v_config.subject_distribution
  );

  insert into public.exam_attempts (
    user_id, exam_config_id, status, started_at, deadline,
    total_questions, exam_config_snapshot
  )
  values (
    v_user_id, p_exam_config_id, 'in_progress', now(), v_deadline,
    v_config.total_questions, v_snapshot
  )
  returning id into v_attempt_id;

  -- 4. Select questions for this attempt and initialize answer placeholders
  insert into public.exam_answers (attempt_id, question_id, user_answer, is_correct, is_unanswered, marks_awarded, is_flagged)
  select v_attempt_id, eq.id, null, false, true, 0, false
  from public.exam_questions eq
  where eq.exam_config_id = p_exam_config_id
  order by eq.display_order, eq.id
  limit (select total_questions from public.exam_configs where id = p_exam_config_id);

  select count(*) into v_actual_questions
  from public.exam_answers
  where attempt_id = v_attempt_id;

  if v_actual_questions = 0 then
    raise exception 'No questions available for this exam' using errcode = '22023';
  end if;

  update public.exam_attempts
  set total_questions = v_actual_questions
  where id = v_attempt_id;

  return jsonb_build_object('attempt_id', v_attempt_id, 'deadline', v_deadline, 'status', 'in_progress');
end;
$$;

revoke all on function public.start_exam_attempt(uuid) from public, anon, authenticated;
grant execute on function public.start_exam_attempt(uuid) to authenticated;
`
  );

  sql.push(
    "-- 6. Improved save_exam_answer RPC: supports flag-for-review, atomic rate limit check, and updates",
    `create or replace function public.save_exam_answer(
  p_attempt_id uuid,
  p_question_id uuid,
  p_user_answer smallint default null,
  p_is_flagged boolean default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_attempt public.exam_attempts%rowtype;
  v_question public.exam_questions%rowtype;
  v_is_correct boolean;
  v_marks numeric(4,2);
  v_recent_updates int;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into v_attempt
  from public.exam_attempts
  where id = p_attempt_id and user_id = v_user_id
  for update;

  if not found then
    raise exception 'Attempt not found' using errcode = '42501';
  end if;

  if v_attempt.status not in ('in_progress', 'ready') then
    raise exception 'Cannot save answer: attempt is not in progress' using errcode = '42501';
  end if;

  if now() > v_attempt.deadline then
    update public.exam_attempts set status = 'expired' where id = p_attempt_id;
    raise exception 'Exam time has expired' using errcode = '42501';
  end if;

  -- Atomic rate limit: max 60 answer updates per minute per attempt
  select count(*) into v_recent_updates
  from public.exam_answers
  where attempt_id = p_attempt_id and updated_at > now() - interval '1 minute';

  if v_recent_updates >= 60 then
    raise exception 'Too many answer updates. Please slow down.' using errcode = '42501';
  end if;

  select * into v_question
  from public.exam_questions
  where id = p_question_id;

  if not found then
    raise exception 'Question not found' using errcode = '22023';
  end if;

  if v_question.exam_config_id != v_attempt.exam_config_id then
    raise exception 'Question does not belong to this exam' using errcode = '22023';
  end if;

  if p_user_answer is not null then
    v_is_correct := (p_user_answer = v_question.answer);
    if v_question.verification_status = 'official' then
      v_marks := case when v_is_correct then 1.00 else -0.25 end;
    else
      v_marks := case when v_is_correct then 1.00 else 0.00 end;
    end if;
  else
    v_is_correct := false;
    v_marks := 0.00;
  end if;

  insert into public.exam_answers (attempt_id, question_id, user_answer, is_correct, is_unanswered, marks_awarded, is_flagged)
  values (p_attempt_id, p_question_id, p_user_answer, v_is_correct, (p_user_answer is null), v_marks, coalesce(p_is_flagged, false))
  on conflict (attempt_id, question_id) do update set
    user_answer = coalesce(excluded.user_answer, public.exam_answers.user_answer),
    is_correct = case when excluded.user_answer is not null then excluded.is_correct else public.exam_answers.is_correct end,
    is_unanswered = case when excluded.user_answer is not null then false else public.exam_answers.is_unanswered end,
    marks_awarded = case when excluded.user_answer is not null then excluded.marks_awarded else public.exam_answers.marks_awarded end,
    is_flagged = coalesce(p_is_flagged, public.exam_answers.is_flagged),
    updated_at = now();

  return jsonb_build_object(
    'saved', true,
    'is_correct', v_is_correct,
    'marks_awarded', v_marks,
    'is_flagged', coalesce(p_is_flagged, false)
  );
end;
$$;

revoke all on function public.save_exam_answer(uuid, uuid, smallint, boolean) from public, anon, authenticated;
grant execute on function public.save_exam_answer(uuid, uuid, smallint, boolean) to authenticated;
`
  );

  sql.push(
    "-- 7. Improved submit_exam_attempt RPC: idempotent handling, atomic grading",
    `create or replace function public.submit_exam_attempt(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_attempt public.exam_attempts%rowtype;
  v_score numeric(6,2);
  v_correct int;
  v_incorrect int;
  v_unanswered int;
  v_subject_breakdown jsonb;
  v_question_results jsonb;
  v_max_score numeric(6,2);
  v_score_percentage numeric(5,2);
  v_time_used int;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into v_attempt
  from public.exam_attempts
  where id = p_attempt_id and user_id = v_user_id
  for update;

  if not found then
    raise exception 'Attempt not found' using errcode = '42501';
  end if;

  -- Idempotency: if already submitted, return the existing result safely
  if v_attempt.status = 'submitted' then
    return jsonb_build_object(
      'attempt_id', p_attempt_id,
      'status', 'submitted',
      'score', v_attempt.score_value,
      'max_score', v_attempt.max_score,
      'percentage', v_attempt.score_percentage,
      'correct', v_attempt.correct_count,
      'incorrect', v_attempt.incorrect_count,
      'unanswered', v_attempt.unanswered_count,
      'time_used_minutes', v_attempt.time_used_minutes
    );
  end if;

  select count(*) filter (where is_correct) into v_correct from public.exam_answers where attempt_id = p_attempt_id;
  select count(*) filter (where not is_correct and not is_unanswered) into v_incorrect from public.exam_answers where attempt_id = p_attempt_id;
  select count(*) filter (where is_unanswered) into v_unanswered from public.exam_answers where attempt_id = p_attempt_id;
  select coalesce(sum(marks_awarded), 0) into v_score from public.exam_answers where attempt_id = p_attempt_id;

  select (coalesce(total_questions, 0) * coalesce(marks_per_correct, 1))::numeric(6,2) into v_max_score
  from public.exam_configs where id = (select exam_config_id from public.exam_attempts where id = p_attempt_id);

  if v_max_score is null or v_max_score = 0 then
    v_max_score := coalesce(v_attempt.total_questions, 1)::numeric(6,2);
  end if;

  v_score_percentage := case when v_max_score > 0 then round((greatest(0, v_score) / v_max_score) * 100, 2) else 0 end;
  v_time_used := floor(extract(epoch from (now() - v_attempt.started_at)) / 60);

  v_question_results := (
    select jsonb_agg(jsonb_build_object(
      'question_id', ea.question_id,
      'prompt', eq.prompt,
      'options', eq.options,
      'user_answer', ea.user_answer,
      'correct_answer', eq.answer,
      'is_correct', ea.is_correct,
      'is_unanswered', ea.is_unanswered,
      'is_flagged', ea.is_flagged,
      'marks_awarded', ea.marks_awarded,
      'explanation', eq.explanation,
      'subject', eq.subject,
      'topic', eq.topic
    ) order by eq.display_order, ea.created_at)
    from public.exam_answers ea
    join public.exam_questions eq on eq.id = ea.question_id
    where ea.attempt_id = p_attempt_id
  );

  v_subject_breakdown := (
    select jsonb_object_agg(eq.subject, subj_stats)
    from (
      select eq.subject,
        jsonb_build_object(
          'correct', count(*) filter (where ea.is_correct),
          'incorrect', count(*) filter (where not ea.is_correct and not ea.is_unanswered),
          'unanswered', count(*) filter (where ea.is_unanswered),
          'total', count(*)
        ) as subj_stats
      from public.exam_answers ea
      join public.exam_questions eq on eq.id = ea.question_id
      where ea.attempt_id = p_attempt_id
      group by eq.subject
    ) subj_stats
  );

  update public.exam_attempts
  set status = 'submitted',
      submitted_at = now(),
      score = v_correct,
      correct_count = v_correct,
      incorrect_count = v_incorrect,
      unanswered_count = v_unanswered,
      score_value = v_score,
      max_score = v_max_score,
      score_percentage = v_score_percentage,
      time_used_minutes = v_time_used,
      subject_breakdown = v_subject_breakdown,
      question_results = v_question_results
  where id = p_attempt_id;

  insert into public.study_activity (user_id, activity_type, details)
  values (v_user_id, 'exam_completed', jsonb_build_object(
    'attempt_id', p_attempt_id,
    'exam_config_id', (select exam_config_id from public.exam_attempts where id = p_attempt_id),
    'score', v_score,
    'percentage', v_score_percentage
  ));

  return jsonb_build_object(
    'attempt_id', p_attempt_id,
    'status', 'submitted',
    'score', v_score,
    'max_score', v_max_score,
    'percentage', v_score_percentage,
    'correct', v_correct,
    'incorrect', v_incorrect,
    'unanswered', v_unanswered,
    'time_used_minutes', v_time_used
  );
end;
$$;

revoke all on function public.submit_exam_attempt(uuid) from public, anon, authenticated;
grant execute on function public.submit_exam_attempt(uuid) to authenticated;
`
  );

  sql.push(
    "-- 8. Improved get_exam_attempt RPC: hides solutions during active exam, returns exact attempt questions & flagged status",
    `create or replace function public.get_exam_attempt(p_attempt_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_result jsonb;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'id', ea.id,
    'exam_config_id', ea.exam_config_id,
    'status', ea.status,
    'started_at', ea.started_at,
    'deadline', ea.deadline,
    'submitted_at', ea.submitted_at,
    'score', ea.score,
    'total_questions', ea.total_questions,
    'correct_count', ea.correct_count,
    'incorrect_count', ea.incorrect_count,
    'unanswered_count', ea.unanswered_count,
    'score_value', ea.score_value,
    'max_score', ea.max_score,
    'score_percentage', ea.score_percentage,
    'time_used_minutes', ea.time_used_minutes,
    'subject_breakdown', ea.subject_breakdown,
    'question_results', ea.question_results,
    'exam_config_snapshot', ea.exam_config_snapshot,
    'created_at', ea.created_at,
    'updated_at', ea.updated_at,
    'exam_config', jsonb_build_object(
      'id', ec.id,
      'name', ec.name,
      'exam_type', ec.exam_type,
      'year', ec.year,
      'duration_minutes', ec.duration_minutes,
      'total_questions', ec.total_questions,
      'marks_per_correct', ec.marks_per_correct,
      'marks_per_incorrect', ec.marks_per_incorrect,
      'marks_per_unanswered', ec.marks_per_unanswered,
      'negative_marking', ec.negative_marking,
      'verification_status', ec.verification_status
    ),
    'questions', (
      select jsonb_agg(jsonb_build_object(
        'id', eq.id,
        'prompt', eq.prompt,
        'options', eq.options,
        'answer', case when ea.status in ('submitted', 'expired') then eq.answer else null end,
        'explanation', case when ea.status in ('submitted', 'expired') then eq.explanation else null end,
        'subject', eq.subject,
        'topic', eq.topic,
        'verification_status', eq.verification_status,
        'source_ref', eq.source_ref,
        'display_order', eq.display_order
      ) order by eq.display_order, eq.id)
      from public.exam_answers ans
      join public.exam_questions eq on eq.id = ans.question_id
      where ans.attempt_id = p_attempt_id
    ),
    'answers', (
      select jsonb_agg(jsonb_build_object(
        'question_id', ans.question_id,
        'user_answer', ans.user_answer,
        'is_correct', case when ea.status in ('submitted', 'expired') then ans.is_correct else null end,
        'is_unanswered', ans.is_unanswered,
        'is_flagged', ans.is_flagged,
        'marks_awarded', case when ea.status in ('submitted', 'expired') then ans.marks_awarded else null end
      ) order by ans.created_at)
      from public.exam_answers ans
      where ans.attempt_id = p_attempt_id
    )
  ) into v_result
  from public.exam_attempts ea
  join public.exam_configs ec on ec.id = ea.exam_config_id
  where ea.id = p_attempt_id and ea.user_id = auth.uid();

  if not found then
    raise exception 'Attempt not found' using errcode = '42501';
  end if;

  return v_result;
end;
$$;

revoke all on function public.get_exam_attempt(uuid) from public, anon, authenticated;
grant execute on function public.get_exam_attempt(uuid) to authenticated;
`
  );

  sql.push(
    "-- 9. Supabase Storage bucket provisioning for AI Study Workspace",
    `do $$
begin
  if exists (select 1 from pg_tables where schemaname = 'storage' and tablename = 'buckets') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('study-sources', 'study-sources', false, 10485760, array['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'text/plain', 'text/markdown'])
    on conflict (id) do nothing;
  end if;

  if exists (select 1 from pg_tables where schemaname = 'storage' and tablename = 'objects') then
    execute 'alter table storage.objects enable row level security';
    if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Users manage their own study source files') then
      execute 'create policy "Users manage their own study source files" on storage.objects for all to authenticated using (bucket_id = ''study-sources'' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = ''study-sources'' and (storage.foldername(name))[1] = auth.uid()::text)';
    end if;
  end if;
end $$;
`,
    "commit;",
    ""
  );

  fs.writeFileSync(MIGRATION_FILE, sql.join("\n"), "utf8");
  console.log(`Generated migration ${path.basename(MIGRATION_FILE)} with ${configs.length} configs and ${questionInsertCount} question seeds.`);
}

generateMigration();