# Supabase Setup

## Environment

Copy `.env.example` to `.env.local` in the repository root. Set:

- `NEXT_PUBLIC_SUPABASE_URL` to the project API URL from the Supabase project's **Connect** dialog. It has the form `https://<project-ref>.supabase.co`; the dashboard management URL is not the API URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the project's publishable key.

These are public client configuration values, not a service-role key. Never put a service-role or secret key in a `NEXT_PUBLIC_` variable. Restart `npm run dev` after changing `.env.local`; for deployments, configure the public variables before building.

The app shows an unconfigured state when either value is absent or the URL is invalid. Auth and database requests have not been verified until the project values are configured.

## Apply The Migration

Migrations `202610110006` (AI study-aid tables with owner-only RLS) and `202610110007` (subject eligibility columns, student selections, compulsory/entrance seeds) were applied to the linked project with the Supabase CLI on 2026-10-11: `supabase db push` applies any pending files from `migrations/` in order and records them in the remote history. Rerunning it is safe; each migration runs once and the seeds use fixed IDs with `on conflict do nothing`, so repeats create no duplicates.

The repository does not require the Supabase CLI. To apply the schema manually:

1. Open the Supabase project dashboard and go to **SQL Editor**.
2. Create a new query.
3. Copy the complete contents of `migrations/202610110001_initial_learning_schema.sql` into the editor.
4. Review the statements and run the query once. This migration creates tables, indexes, grants, RLS policies, and the auth profile trigger. It contains no `DROP`, `TRUNCATE`, or data-deletion statements.

Do not treat the migration as applied until the SQL Editor reports success. The migration seeds four clearly labeled sample lessons so their progress can be stored against stable IDs. Lesson content remains illustrative, not verified curriculum coverage.

## Authentication Redirects

In Supabase **Authentication → URL Configuration**, set the local Site URL to `http://localhost:3000` and allow `http://localhost:3000/auth/callback`. Add the corresponding production origin and `/auth/callback` before deploying. Email confirmation behavior depends on the project's Auth email-provider settings.

## RLS Review

RLS is enabled for the five application tables and the private quiz-answer table. Published lessons are read-only to anonymous and authenticated roles. Profiles can be read and their display name updated only by the matching `auth.uid()`; profile creation is performed by the auth trigger. Lesson progress allows CRUD only for the matching owner and only for published lessons. Quiz attempts are owner-readable but have no client insert grant or insert policy; authenticated users submit answer selections to `submit_quiz_attempt`, which reads a private answer key, derives `auth.uid()`, calculates the score, and inserts the attempt and activity atomically. Study activity is owner-readable and owner-insertable. Server actions independently verify sessions with `auth.getUser()`; browser-supplied user IDs and scores are not accepted.

After applying the migration, inspect **Database → Tables → Policies** or query `pg_policies`. To verify isolation, create two test accounts and, using each account's authenticated client, confirm it can read its own profile and private records but receives no rows for the other account's records. Also verify anonymous clients can read published lessons but cannot read private tables. No RLS or live Auth test could be run from this workspace because `.env.local` and project credentials are not present here.

## Progress Persistence

The app includes server actions for reading the signed-in user's profile, lesson progress, quiz attempts, and activity; updating that user's display name and lesson progress; and recording quiz attempts. Scores are computed from server-only answer data. These operations return explicit unconfigured, signed-out, and database-error states. Until you set `.env.local`, apply the migration, and verify account isolation, the dashboard displays labeled sample values and must not be treated as persistent account data.