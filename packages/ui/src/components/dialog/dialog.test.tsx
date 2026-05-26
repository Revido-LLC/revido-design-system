import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Dialog } from './dialog'
import { Button } from '../button'

describe('Dialog', () => {
  it('opens when trigger is clicked', async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="Test Dialog">
        <p>Dialog content</p>
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })

  it('renders the title', async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="My Dialog">
        <p>Content</p>
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('My Dialog')).toBeInTheDocument()
  })

  it('closes when close button is clicked', async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="Dialog">
        <p>Content</p>
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
