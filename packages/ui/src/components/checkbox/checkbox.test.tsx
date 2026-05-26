import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('renders with a label', () => {
    render(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange}>Accept</Checkbox>)
    await userEvent.click(screen.getByLabelText('Accept'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when isDisabled is true', () => {
    render(<Checkbox isDisabled>Disabled</Checkbox>)
    expect(screen.getByLabelText('Disabled')).toBeDisabled()
  })
})
