import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './tooltip'
import { Button } from '../button'

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  argTypes: { placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: { content: 'This is a tooltip', children: <Button>Hover me</Button> },
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '64px', justifyContent: 'center' }}>
      <Tooltip content="Top" placement="top"><Button variant="outline">Top</Button></Tooltip>
      <Tooltip content="Bottom" placement="bottom"><Button variant="outline">Bottom</Button></Tooltip>
      <Tooltip content="Left" placement="left"><Button variant="outline">Left</Button></Tooltip>
      <Tooltip content="Right" placement="right"><Button variant="outline">Right</Button></Tooltip>
    </div>
  ),
}
