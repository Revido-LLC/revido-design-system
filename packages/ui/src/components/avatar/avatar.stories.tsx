import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'General/Avatar',
  component: Avatar,
  argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?u=revido', alt: 'Jane Doe', size: 'md' },
}

export const WithInitials: Story = {
  args: { alt: 'Jane Doe', size: 'md' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Avatar alt="User" size="xs" />
      <Avatar alt="User" size="sm" />
      <Avatar alt="User" size="md" />
      <Avatar alt="User" size="lg" />
      <Avatar alt="User" size="xl" />
    </div>
  ),
}
