import type { ReactNode } from 'react'

interface ErrorStateProps {
  title?: string
  description?: string
  code?: string
  onRetry?: () => void
  children?: ReactNode
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  code,
  onRetry,
  children,
}: ErrorStateProps) {
  return (
    <div className="state state-error" role="alert">
      {code ? <span className="state-code">{code}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
      {children}
    </div>
  )
}
