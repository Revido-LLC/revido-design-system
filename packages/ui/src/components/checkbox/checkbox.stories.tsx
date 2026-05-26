import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = { args: { children: 'Accept terms and conditions' } }
export const Checked: Story = { args: { children: 'I agree', defaultSelected: true } }
export const Indeterminate: Story = { args: { children: 'Select all', isIndeterminate: true } }
export const Disabled: Story = { args: { children: 'Disabled checkbox', isDisabled: true } }
