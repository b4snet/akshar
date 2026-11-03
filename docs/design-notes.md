# Akshar design direction

## Reference status

The screenshot described by the current brief is the Pinterest-style three-column learning dashboard. It replaces the earlier green/saffron fallback. The attachment is not available as a pixel-readable workspace file in this session, so the hexadecimal values below are implementation best-fit values for the visual described in the brief, not machine-extracted values.

## Reference palette

- Page `--bg`: `#F7F5EF` — warm cream/off-white.
- Cards `--surface`: `#FFFFFF` — white course and activity cards.
- Recessed rails/panels `--rail` / `--panel`: `#EDE9DF` / `#EAE6DC`.
- `--border`: `#DDD8CC` — warm hairline.
- `--ink`: `#171717` — primary text and active black.
- `--ink-muted`: `#686861` — quiet secondary text.
- Physics: `#F4C9D5`
- Chemistry: `#F3D4BE` (dark: `#775B49`)
- Mathematics: `#D9D1F3` (dark: `#625B77`)
- Biology: `#CDE8D8` (dark: `#506B59`)
- English: `#F1E2AA` (dark: `#746B45`)
- Nepali: `#C9DEF1` (dark: `#526879`)
- CEE: `#E4CADB` (dark: `#705A6A`)
- IOE: `#D6DEC0` (dark: `#626B4F`)

## Typography and card anatomy

Large headlines use a light DM Sans-like geometric face with tight letter spacing and Devanagari fallback. Body copy stays quiet at approximately 13–16px. Course cards use 24px radii, a white 44px circular icon chip, a small title at lower left, a white progress pill at top right, and a progress/meta line beneath.

## Radii, rail, depth and iconography

- Cards: 24px; right panel: 28px; controls/pills: 999px; desktop icon rail: 32px.
- Depth: soft restrained shadows on white cards only; rails and panels use flat warm beige.
- The desktop rail has 48px circular white icons, settings/profile pinned at the bottom, and a solid black active circle.
- Filter row pills scroll horizontally and gain a right-edge fade. Mobile uses a pill-shaped bottom rail with the same black active state.

## Typography

Manrope-like geometry for UI/body text, paired with a restrained editorial serif for major display headings. Noto Sans Devanagari supplies a matching bilingual fallback. Type is fluid but capped, with body copy around 16px and comfortable 1.6–1.8 line height on reading surfaces.

## Shape, borders, and depth

- Radii: 8px controls, 12–16px cards, 999px pills.
- Preferred depth language: hairline borders plus restrained single-layer shadows; avoid glossy gradients or heavy elevation.
- Spacing: 360px mobile-first, 16–20px page gutters, 24px section rhythm, 32–48px desktop sections.

## Card anatomy

Cards use a small eyebrow or icon, a clear title, concise supporting copy, a progress/action row, and generous internal breathing room. Dense dashboard data is grouped into calm cards rather than tables of unrelated metrics.

## Iconography

Use existing line icons with consistent 18–20px sizing, rounded stroke joins, and a muted color. Decorative UI symbols should be sparse and contextual.

## Density and motion

Default density is medium on mobile and compact but calm on desktop. Motion lasts 150–250ms with ease-out timing, while transforms are limited to subtle 1–3px lifts and progress fills. Reduced-motion preferences disable transitions and entrance animation.

## Overall mood

Warm paper, botanical green, clear typography, and low-noise layouts. The visual language should feel culturally familiar and focused rather than childish or corporate.

## Nepali identity — light theme only, English copy only

- Lokta paper `--lokta-paper`: `#F7F5EF`, the page background.
- Gurans crimson `--gurans-crimson`: `#A52A3A`, active accents and key highlights.
- Himalayan blue `--himalayan-blue`: `#263F73`, secondary links and line art.
- Marigold `--marigold`: `#E8A846`, streaks, badges, and celebration accents.
- Prayer green `--prayer-green`: `#557B63`, restrained success and flag accents.
- Prayer white: `#FFFDF8`.

Shared motifs live in `src/components/ui/nepali/NepaliMotifs.tsx`, with the tileable Dhaka strip in `public/patterns/dhaka.svg`. `PatternStrip` appears at the top of marketing, app, auth, dashboard, and footer surfaces. `Mandala` is restricted to hero and final-CTA watermarks. `Skyline` marks page headers and footers. `Bunting` divides major landing/dashboard sections. `ArchFrame` frames the product preview, profile avatars, and selected feature illustrations. `NepaliIllustration` supplies mountain, lotus, pagoda, and lamp empty/loading states.

Patterns remain 4–10% visual strength, never sit behind body copy, scale down on mobile, and stop animating under reduced-motion settings. This version is **light theme only** and all visible copy is English. Devanagari is limited to the existing `अ` logo mark.

## Route and shared-component audit

Marketing routes: `/`, `/privacy`, `/terms`.
Authentication routes: `/auth/login`, `/signup`, `/login`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/callback`.
Product routes: `/dashboard`, `/learn`, `/learn/[lessonId]`, `/practice`, `/exam`, `/exam/start/[examId]`, `/exam/attempt/[attemptId]`, `/exam/attempt/[attemptId]/result`, `/progress`, `/study`, `/tutor`, `/settings`, `/onboarding`, `/curriculum`.

Shared shell/components: `AppShell`, `SessionControls`, `Header`, `AuthPanel`, `AuthForm`, landing, dashboard cards, course cards, learn browser/reader, practice experience, exam runner/result, progress panels, study workspace/aids, tutor demo, settings, and icons.

Primary inconsistencies:

- App and marketing surfaces use separate visual languages.
- The global stylesheet has very dense legacy selectors and several hard-coded dark/blue values that conflict with themes.
- The dashboard shell is visually crowded and uses compact text sizes below comfortable mobile readability.
- Auth, study, and exam experiences rely on one-off controls instead of a shared component vocabulary.
- Large portions of the stylesheet need responsive normalization to remove horizontal overflow and improve 44px touch targets.
- Loading states contain explicit text rather than polished skeleton surfaces.
