// Shared validation utilities for server actions.
// All validation functions return { ok: true } or { ok: false; message: string }.

export type ValidationResult = { ok: true } | { ok: false; message: string };

export function validateUuid(value: unknown, fieldName: string): ValidationResult {
  if (typeof value !== "string") {
    return { ok: false, message: `${fieldName} must be a string` };
  }
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(value)) {
    return { ok: false, message: `Invalid ${fieldName} format` };
  }
  return { ok: true };
}

export function validateNonEmptyString(value: unknown, fieldName: string, maxLength = 1000): ValidationResult {
  if (typeof value !== "string" || value.trim().length === 0) {
    return { ok: false, message: `${fieldName} must be a non-empty string` };
  }
  if (value.length > maxLength) {
    return { ok: false, message: `${fieldName} must not exceed ${maxLength} characters` };
  }
  return { ok: true };
}

export function validateNumberRange(value: unknown, fieldName: string, min: number, max: number): ValidationResult {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return { ok: false, message: `${fieldName} must be an integer` };
  }
  if (value < min || value > max) {
    return { ok: false, message: `${fieldName} must be between ${min} and ${max}` };
  }
  return { ok: true };
}

export function combineResults(...results: ValidationResult[]): ValidationResult {
  for (const result of results) {
    if (!result.ok) return result;
  }
  return { ok: true };
}