import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'url', 'tel', 'search', 'number'] },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: 'Email', placeholder: 'Enter your email' } }

export const WithDescription: Story = {
  args: { label: 'Email', placeholder: 'Enter your email', description: "We'll never share your email with anyone else." },
}

export const WithError: Story = {
  args: { label: 'Email', placeholder: 'Enter your email', isInvalid: true, errorMessage: 'Please enter a valid email address.' },
}

export const Required: Story = { args: { label: 'Email', placeholder: 'Enter your email', isRequired: true } }

export const Disabled: Story = { args: { label: 'Email', placeholder: 'Enter your email', isDisabled: true } }
