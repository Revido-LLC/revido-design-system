import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './select'

const fruits = [
  { key: 'apple', label: 'Apple' },
  { key: 'banana', label: 'Banana' },
  { key: 'cherry', label: 'Cherry' },
  { key: 'date', label: 'Date' },
  { key: 'elderberry', label: 'Elderberry' },
]

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: { label: 'Favorite Fruit', items: fruits, placeholder: 'Choose a fruit' },
}

export const WithError: Story = {
  args: { label: 'Fruit', items: fruits, isInvalid: true, errorMessage: 'Please select a fruit.' },
}

export const Disabled: Story = {
  args: { label: 'Fruit', items: fruits, isDisabled: true },
}
