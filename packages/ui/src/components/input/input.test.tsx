import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders with a label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    render(<Input label="Name" />)
    const input = screen.getByLabelText('Name')
    await userEvent.type(input, 'John')
    expect(input).toHaveValue('John')
  })

  it('shows error message', () => {
    render(<Input label="Email" errorMessage="Required field" isInvalid />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('shows description text', () => {
    render(<Input label="Email" description="We'll never share your email" />)
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it('is disabled when isDisabled is true', () => {
    render(<Input label="Email" isDisabled />)
    expect(screen.getByLabelText('Email')).toBeDisabled()
  })
})
