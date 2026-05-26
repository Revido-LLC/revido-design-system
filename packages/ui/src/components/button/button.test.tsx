import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const onClick = vi.fn()
    render(<Button onPress={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when isDisabled is true', () => {
    render(<Button isDisabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    expect(container.firstChild).toHaveClass('border')
  })

  it('applies size classes', () => {
    const { container } = render(<Button size="sm">Small</Button>)
    expect(container.firstChild).toHaveClass('text-sm')
  })
})
