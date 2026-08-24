import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router'
import { createAppRouter } from './router'

describe('app router', () => {
  it('renders the shell and home page at "/"', () => {
    window.history.pushState({}, '', '/')

    render(<RouterProvider router={createAppRouter()} />)

    expect(screen.getByText('Akshar')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /welcome to akshar/i }),
    ).toBeInTheDocument()
  })

  it('renders the not-found page for unknown paths', () => {
    window.history.pushState({}, '', '/this-route-does-not-exist')

    render(<RouterProvider router={createAppRouter()} />)

    expect(screen.getByRole('alert')).toHaveTextContent('NOT_FOUND')
    expect(screen.getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/')
  })
})
