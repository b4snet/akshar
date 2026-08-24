export const API_ERROR_CODES = [
  'BAD_REQUEST',
  'UNAUTHENTICATED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'VALIDATION_ERROR',
  'RATE_LIMITED',
  'METHOD_NOT_ALLOWED',
  'SERVER_ERROR',
] as const

export type ApiErrorCode = (typeof API_ERROR_CODES)[number] | 'NETWORK_ERROR'

export class ApiClientError extends Error {
  readonly code: string
  readonly details: Record<string, unknown>
  readonly status: number

  constructor(
    code: ApiErrorCode,
    message: string,
    details: Record<string, unknown> = {},
    status = 0,
  ) {
    super(message)
    this.name = 'ApiClientError'
    this.code = code
    this.details = details
    this.status = status
  }
}
