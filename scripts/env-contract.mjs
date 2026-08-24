// AKSHAR environment contract (Phase 006) — single machine-readable definition
// of every committed environment template, enforced by `npm run env:check`.
//
// Rules:
//  - `required` keys MUST exist in the template file.
//  - `forbidden` keys MUST NOT exist (guards against leaking real secrets).
//  - `values` pins exact values for non-secret contract constants so the
//    root template, backend template and infrastructure/compose.dev.yaml stay aligned.
// Secret VALUES are never read from real .env files here; only committed
// templates are validated, and no value is ever printed.

export const CONTRACT = [
  {
    file: ".env.example",
    description: "root reference template for the whole stack",
    required: [
      "VITE_API_BASE_URL",
      "APP_NAME",
      "APP_ENV",
      "APP_URL",
      "DB_CONNECTION",
      "DB_HOST",
      "DB_PORT",
      "DB_DATABASE",
      "DB_USERNAME",
      "REDIS_HOST",
      "REDIS_PORT",
      "CORS_ALLOWED_ORIGINS",
    ],
    forbidden: [],
    values: {
      DB_CONNECTION: "pgsql",
      DB_HOST: "127.0.0.1",
      DB_PORT: "5432",
      DB_DATABASE: "akshar",
      DB_USERNAME: "akshar",
      REDIS_HOST: "127.0.0.1",
      REDIS_PORT: "6379",
    },
  },
  {
    file: "backend/.env.example",
    description: "runnable Laravel backend template",
    required: [
      "APP_NAME",
      "APP_ENV",
      "APP_KEY",
      "APP_URL",
      "DB_CONNECTION",
      "DB_HOST",
      "DB_PORT",
      "DB_DATABASE",
      "DB_USERNAME",
      "DB_PASSWORD",
      "SESSION_DRIVER",
      "CACHE_STORE",
      "QUEUE_CONNECTION",
      "REDIS_HOST",
      "REDIS_PORT",
      "CORS_ALLOWED_ORIGINS",
    ],
    forbidden: [
      // A generated application key must never be committed, even by accident.
      "APP_KEY=base64:",
    ],
    values: {
      APP_NAME: "Akshar",
      DB_CONNECTION: "pgsql",
      DB_HOST: "127.0.0.1",
      DB_PORT: "5432",
      DB_DATABASE: "akshar",
      DB_USERNAME: "akshar",
    },
  },
]

const KEY_PATTERN = /^([A-Z0-9_]+)\s*=\s*(.*)$/

export function parseTemplate(content) {
  const entries = new Map()
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (line.length === 0 || line.startsWith("#")) continue
    const match = KEY_PATTERN.exec(line)
    if (!match) continue
    entries.set(match[1], match[2])
  }
  return entries
}

export function validateTemplate(template) {
  const errors = []
  let entries
  try {
    entries = parseTemplate(template.content)
  } catch {
    return { ok: false, errors: [`unreadable template: ${template.file}`] }
  }

  for (const key of template.required) {
    if (!entries.has(key)) {
      errors.push(`${template.file}: missing required variable ${key}`)
    }
  }

  for (const [key, expected] of Object.entries(template.values)) {
    const actual = entries.get(key)
    if (actual !== undefined && actual !== expected) {
      errors.push(`${template.file}: ${key} must be "${expected}" but is "${actual}"`)
    }
  }

  for (const marker of template.forbidden) {
    if (marker.includes("=")) {
      if (template.content.includes(marker)) {
        errors.push(`${template.file}: forbidden pattern present (${marker.split("=")[0]})`)
      }
      continue
    }
    if (entries.has(marker)) {
      errors.push(`${template.file}: forbidden variable present (${marker})`)
    }
  }

  return { ok: errors.length === 0, errors }
}
