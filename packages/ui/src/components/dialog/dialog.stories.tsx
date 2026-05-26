import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './dialog'
import { Button } from '../button'
import { Input } from '../input'

const meta: Meta<typeof Dialog> = {
  title: 'Overlays/Dialog',
  component: Dialog,
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    title: 'Edit Profile',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    ),
  },
}

export const SimpleMessage: Story = {
  args: {
    trigger: <Button variant="outline">Show Info</Button>,
    title: 'Information',
    children: <p style={{ color: '#667085' }}>This is a simple informational dialog.</p>,
  },
}
