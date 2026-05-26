import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { Button } from '../button'

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  argTypes: { variant: { control: 'select', options: ['elevated', 'outline', 'filled'] } },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>A short description of the card content.</Card.Description>
      </Card.Header>
      <Card.Body>
        <p style={{ color: '#667085' }}>This is the card body with some content.</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </Card.Footer>
    </Card>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Card variant="outline" style={{ padding: '24px', flex: 1 }}>Outline</Card>
      <Card variant="elevated" style={{ padding: '24px', flex: 1 }}>Elevated</Card>
      <Card variant="filled" style={{ padding: '24px', flex: 1 }}>Filled</Card>
    </div>
  ),
}
