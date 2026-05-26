import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Separator } from './separator'

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveAttribute('role', 'separator')
    expect(container.firstChild).toHaveClass('h-px')
  })

  it('renders a vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.firstChild).toHaveClass('w-px')
  })
})
