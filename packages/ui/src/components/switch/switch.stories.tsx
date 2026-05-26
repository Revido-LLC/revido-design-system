import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = { args: { children: 'Enable notifications' } }
export const Selected: Story = { args: { children: 'Dark mode', defaultSelected: true } }
export const Disabled: Story = { args: { children: 'Disabled switch', isDisabled: true } }

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Switch size="sm">Small</Switch>
      <Switch size="md">Medium</Switch>
      <Switch size="lg">Large</Switch>
    </div>
  ),
}
