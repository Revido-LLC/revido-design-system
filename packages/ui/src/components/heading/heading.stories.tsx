import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './heading'

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Default: Story = { args: { children: 'Heading Text', as: 'h2' } }

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Heading as="h1">Heading 1</Heading>
      <Heading as="h2">Heading 2</Heading>
      <Heading as="h3">Heading 3</Heading>
      <Heading as="h4">Heading 4</Heading>
      <Heading as="h5">Heading 5</Heading>
      <Heading as="h6">Heading 6</Heading>
    </div>
  ),
}
