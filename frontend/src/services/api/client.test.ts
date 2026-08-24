import { afterEach, describe, expect, it, vi } from 'vitest'
import { request } from './client'
import { ApiClientError } from './errors'
import { apiBaseUrl } from '../config'

describe('api client', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('parses the canonical success envelope and targets the versioned base url', async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({ data: { status: 'ok' }, meta: { apiVersion: 'v1' } }),
          {
            status: 200,
          },
        ),
    )
    vi.stubGlobal('fetch', fetchMock)

    const result = await request<{ status: string }>('/health')

    expect(result.data.status).toBe('ok')
    expect(result.meta.apiVersion).toBe('v1')
    expect(fetchMock).toHaveBeenCalledWith(`${apiBaseUrl}/health`, expect.any(Object))
  })

  it('throws ApiClientError carrying the backend error envelope', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              error: {
                code: 'VALIDATION_ERROR',
                message: 'The submitted data is invalid.',
                details: { fields: {} },
              },
            }),
            { status: 422 },
          ),
      ),
    )

    const error = await request('/students').catch((caught: unknown) => caught)

    expect(error).toBeInstanceOf(ApiClientError)
    expect(error).toMatchObject({
      code: 'VALIDATION_ERROR',
      status: 422,
      details: { fields: {} },
      message: 'The submitted data is invalid.',
    })
  })

  it('normalizes unknown wire codes to SERVER_ERROR', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              error: { code: 'SOMETHING_ELSE', message: '?', details: {} },
            }),
            {
              status: 418,
            },
          ),
      ),
    )

    await expect(request('/anything')).rejects.toMatchObject({
      code: 'SERVER_ERROR',
      status: 418,
    })
  })

  it('maps network failures to NETWORK_ERROR', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('network down')
      }),
    )

    await expect(request('/health')).rejects.toMatchObject({
      code: 'NETWORK_ERROR',
      status: 0,
    })
  })

  it('falls back to SERVER_ERROR when the failure body is not the canonical envelope', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('<html>boom</html>', { status: 500 })),
    )

    await expect(request('/health')).rejects.toMatchObject({
      code: 'SERVER_ERROR',
      status: 500,
    })
  })
})
