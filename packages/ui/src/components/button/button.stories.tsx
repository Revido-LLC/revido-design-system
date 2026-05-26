import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'General/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'soft', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: 'Button', variant: 'solid', size: 'md' },
}

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline', size: 'md' },
}

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost', size: 'md' },
}

export const Loading: Story = {
  args: { children: 'Loading', isLoading: true },
}

export const Disabled: Story = {
  args: { children: 'Disabled', isDisabled: true },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
}
