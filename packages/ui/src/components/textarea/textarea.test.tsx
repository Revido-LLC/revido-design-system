import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders with a label', () => {
    render(<Textarea label="Message" />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Textarea label="Message" />)
    const textarea = screen.getByLabelText('Message')
    await userEvent.type(textarea, 'Hello world')
    expect(textarea).toHaveValue('Hello world')
  })

  it('shows error message', () => {
    render(<Textarea label="Message" errorMessage="Required" isInvalid />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('is disabled when isDisabled is true', () => {
    render(<Textarea label="Message" isDisabled />)
    expect(screen.getByLabelText('Message')).toBeDisabled()
  })
})
