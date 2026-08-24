export interface ApiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

export interface ApiErrorBody {
  error: {
    code: string
    message: string
    details: Record<string, unknown>
  }
}
