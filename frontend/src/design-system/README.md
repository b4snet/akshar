# Design System

Single home for visual primitives and tokens shared by every feature.

- `tokens.css` — CSS custom properties (color, spacing, typography, radius).
  Light theme is the default; a Nepal-language (Devanagari) friendly font stack
  is part of the base token set. Dark themes must be added as token overrides,
  never as component-level colors.
- Shared UI primitives (buttons, inputs, tables) will live beside `tokens.css`
  as they are introduced by their owning phases. Feature modules must consume
  primitives from here instead of styling raw elements ad hoc.
