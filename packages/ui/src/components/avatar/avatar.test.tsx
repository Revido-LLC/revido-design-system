import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar } from './avatar'

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />)
    expect(screen.getByRole('img', { name: 'User' })).toBeInTheDocument()
  })

  it('renders initials when no src is provided', () => {
    render(<Avatar alt="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders single initial for one-word name', () => {
    render(<Avatar alt="John" />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('applies size classes', () => {
    const { container } = render(<Avatar alt="User" size="lg" />)
    expect(container.firstChild).toHaveClass('h-12')
  })
})
