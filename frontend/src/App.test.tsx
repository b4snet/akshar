import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App shell', () => {
  it('renders the Akshar identity', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Akshar' })).toBeInTheDocument()
    expect(screen.getByText('Education Operating System for Nepal')).toBeInTheDocument()
  })
})
