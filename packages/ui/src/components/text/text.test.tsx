import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Text } from './text'

describe('Text', () => {
  it('renders as p by default', () => {
    render(<Text>Paragraph</Text>)
    expect(screen.getByText('Paragraph').tagName).toBe('P')
  })

  it('renders as span when specified', () => {
    render(<Text as="span">Inline</Text>)
    expect(screen.getByText('Inline').tagName).toBe('SPAN')
  })

  it('applies muted color', () => {
    const { container } = render(<Text color="muted">Subtle</Text>)
    expect(container.firstChild).toHaveClass('text-muted-foreground')
  })
})
