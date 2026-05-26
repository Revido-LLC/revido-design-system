import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Select } from './select'

const items = [
  { key: 'apple', label: 'Apple' },
  { key: 'banana', label: 'Banana' },
  { key: 'cherry', label: 'Cherry' },
]

describe('Select', () => {
  it('renders with a label', () => {
    render(<Select label="Fruit" items={items} />)
    // Use getByRole to find the visible label associated with the button
    expect(screen.getByRole('button', { name: /fruit/i })).toBeInTheDocument()
  })

  it('shows placeholder text', () => {
    render(<Select label="Fruit" items={items} placeholder="Choose a fruit" />)
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    render(<Select label="Fruit" items={items} />)
    await userEvent.click(screen.getByRole('button'))
    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeInTheDocument()
    expect(within(listbox).getByText('Apple')).toBeInTheDocument()
    expect(within(listbox).getByText('Banana')).toBeInTheDocument()
  })

  it('selects an item', async () => {
    const onSelectionChange = vi.fn()
    render(<Select label="Fruit" items={items} onSelectionChange={onSelectionChange} />)
    await userEvent.click(screen.getByRole('button'))
    const listbox = screen.getByRole('listbox')
    await userEvent.click(within(listbox).getByText('Banana'))
    expect(onSelectionChange).toHaveBeenCalledWith('banana')
  })
})
