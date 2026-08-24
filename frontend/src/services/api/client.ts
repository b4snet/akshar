import { apiBaseUrl } from '../config'
import { API_ERROR_CODES, ApiClientError } from './errors'
import type { ApiErrorCode } from './errors'
import type { ApiErrorBody, ApiResponse } from './envelope'

export type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown }

export async function request<T>(
  path: string,
  init: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { body, headers, ...rest } = init

  let response: Response
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...rest,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiClientError('NETWORK_ERROR', 'Unable to reach the server.')
  }

  return parseResponse<T>(response)
}

export async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    throw await errorFrom(response)
  }

  const payload = (await response.json()) as Partial<ApiResponse<T>>

  return {
    data: payload.data as T,
    meta: payload.meta ?? {},
  }
}

function toApiErrorCode(value: string): ApiErrorCode {
  return (API_ERROR_CODES as readonly string[]).includes(value)
    ? (value as ApiErrorCode)
    : 'SERVER_ERROR'
}

async function errorFrom(response: Response): Promise<ApiClientError> {
  try {
    const payload = (await response.json()) as Partial<ApiErrorBody>
    if (payload.error?.code) {
      return new ApiClientError(
        toApiErrorCode(payload.error.code),
        payload.error.message ?? 'The request failed.',
        payload.error.details ?? {},
        response.status,
      )
    }
  } catch {
    // fall through to the generic server error below
  }

  return new ApiClientError(
    'SERVER_ERROR',
    `Request failed with status ${response.status}.`,
    {},
    response.status,
  )
}
