import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { EmptyState, ErrorState, LoadingState } from './index'

describe('shared states', () => {
  it('renders a live loading region', () => {
    render(<LoadingState label="Fetching students…" />)

    expect(screen.getByRole('status')).toHaveTextContent('Fetching students…')
  })

  it('renders empty state copy', () => {
    render(<EmptyState title="No students yet" description="Add your first student." />)

    expect(screen.getByRole('heading', { name: 'No students yet' })).toBeInTheDocument()
    expect(screen.getByText('Add your first student.')).toBeInTheDocument()
  })

  it('renders error state with code and retry action', async () => {
    const onRetry = vi.fn()
    render(
      <ErrorState code="FORBIDDEN" description="Missing permission." onRetry={onRetry} />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('FORBIDDEN')
    expect(screen.getByText('Missing permission.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
