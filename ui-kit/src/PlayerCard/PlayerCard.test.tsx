import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import PlayerCard from './PlayerCard'

describe('PlayerCard', () => {
  it('renders player name', () => {
    render(<PlayerCard name="John Doe" score={1000} status="active" />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders player score', () => {
    render(<PlayerCard name="Jane Smith" score={2500} status="active" />)
    expect(screen.getByText('Score: 2500')).toBeInTheDocument()
  })

  it('renders active status', () => {
    render(<PlayerCard name="Player 1" score={500} status="active" />)
    expect(screen.getByText('active')).toBeInTheDocument()
  })

  it('renders game-over status', () => {
    render(<PlayerCard name="Player 2" score={300} status="game-over" />)
    expect(screen.getByText('game-over')).toBeInTheDocument()
  })

  it('applies correct class for active status', () => {
    const { container } = render(
      <PlayerCard name="Player 1" score={500} status="active" />
    )
    const card = container.querySelector('.player-card--active')

    expect(card).toBeInTheDocument()
  })

  it('applies correct class for game-over status', () => {
    const { container } = render(
      <PlayerCard name="Player 2" score={300} status="game-over" />
    )
    const card = container.querySelector('.player-card--game-over')

    expect(card).toBeInTheDocument()
  })

  it('renders with zero score', () => {
    render(<PlayerCard name="New Player" score={0} status="active" />)
    expect(screen.getByText('Score: 0')).toBeInTheDocument()
  })
})
