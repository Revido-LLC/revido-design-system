import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './text'

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'select', options: ['default', 'muted', 'destructive', 'success'] },
    weight: { control: 'select', options: ['normal', 'medium', 'semibold', 'bold'] },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = { args: { children: 'This is a paragraph of text.' } }

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="destructive">Destructive color</Text>
      <Text color="success">Success color</Text>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
    </div>
  ),
}
