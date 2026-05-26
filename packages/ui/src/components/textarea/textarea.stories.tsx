import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { label: 'Message', placeholder: 'Type your message...' } }
export const WithError: Story = { args: { label: 'Message', isInvalid: true, errorMessage: 'Message is required.' } }
export const Disabled: Story = { args: { label: 'Message', placeholder: 'Disabled textarea', isDisabled: true } }
