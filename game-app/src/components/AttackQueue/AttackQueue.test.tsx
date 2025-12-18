import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import AttackQueue from './AttackQueue'

describe('AttackQueue', () => {
  it('does not render when count is 0', () => {
    const { container } = render(<AttackQueue count={0} />)

    expect(container.firstChild).toBeNull()
  })

  it('renders when count is greater than 0', () => {
    render(<AttackQueue count={3} />)
    expect(screen.getByText('Incoming Attack!')).toBeInTheDocument()
  })

  it('displays singular "line" for count of 1', () => {
    render(<AttackQueue count={1} />)
    expect(screen.getByText('1 garbage line')).toBeInTheDocument()
  })

  it('displays plural "lines" for count greater than 1', () => {
    render(<AttackQueue count={5} />)
    expect(screen.getByText('5 garbage lines')).toBeInTheDocument()
  })

  it('displays correct count', () => {
    render(<AttackQueue count={10} />)
    expect(screen.getByText('10 garbage lines')).toBeInTheDocument()
  })
})
