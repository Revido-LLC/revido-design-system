import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tooltip } from './tooltip'

describe('Tooltip', () => {
  it('shows tooltip on keyboard focus', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Helpful tip" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    )
    // Tab to trigger keyboard modality, which makes focus visible and allows tooltip to show
    await user.tab()
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful tip')
  })

  it('hides tooltip on blur', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="Tip" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    )
    await user.tab()
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
    await user.tab()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
