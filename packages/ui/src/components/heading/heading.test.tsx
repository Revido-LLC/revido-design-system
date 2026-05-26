import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Heading } from './heading'

describe('Heading', () => {
  it('renders as h2 by default', () => {
    render(<Heading>Title</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title')
  })

  it('renders with specified level', () => {
    render(<Heading as="h1">Main Title</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title')
  })

  it('applies size classes', () => {
    const { container } = render(<Heading size="3xl">Big</Heading>)
    expect(container.firstChild).toHaveClass('text-3xl')
  })
})
