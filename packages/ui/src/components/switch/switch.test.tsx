import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from './switch'

describe('Switch', () => {
  it('renders with a label', () => {
    render(<Switch>Notifications</Switch>)
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const onChange = vi.fn()
    render(<Switch onChange={onChange}>Toggle</Switch>)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when isDisabled is true', () => {
    render(<Switch isDisabled>Disabled</Switch>)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
