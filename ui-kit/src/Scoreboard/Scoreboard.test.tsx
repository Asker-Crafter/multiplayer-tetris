import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Scoreboard from './Scoreboard'

describe('Scoreboard', () => {
  const mockPlayers = [
    { name: 'Player 1', score: 1000, lines: 10, level: 5, place: 1 },
    { name: 'Player 2', score: 800, lines: 8, level: 4, place: 2 },
    { name: 'Player 3', score: 600, lines: 6, level: 3, place: 3 },
  ]

  it('renders table headers correctly', () => {
    render(<Scoreboard players={mockPlayers} />)
    expect(screen.getByText('Place')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Score')).toBeInTheDocument()
    expect(screen.getByText('Lines')).toBeInTheDocument()
    expect(screen.getByText('Level')).toBeInTheDocument()
  })

  it('renders all players', () => {
    render(<Scoreboard players={mockPlayers} />)
    expect(screen.getByText('Player 1')).toBeInTheDocument()
    expect(screen.getByText('Player 2')).toBeInTheDocument()
    expect(screen.getByText('Player 3')).toBeInTheDocument()
  })

  it('displays player scores correctly', () => {
    render(<Scoreboard players={mockPlayers} />)
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('800')).toBeInTheDocument()
    expect(screen.getByText('600')).toBeInTheDocument()
  })

  it('displays player places correctly', () => {
    render(<Scoreboard players={mockPlayers} />)
    const rows = screen.getAllByRole('row')

    expect(rows[1]).toHaveTextContent('1')
    expect(rows[2]).toHaveTextContent('2')
    expect(rows[3]).toHaveTextContent('3')
  })

  it('renders empty table when no players', () => {
    render(<Scoreboard players={[]} />)
    expect(screen.getByText('Place')).toBeInTheDocument()
    expect(screen.queryByText('Player 1')).not.toBeInTheDocument()
  })

  it('displays lines and levels correctly', () => {
    render(<Scoreboard players={mockPlayers} />)
    const rows = screen.getAllByRole('row')

    expect(rows[1]).toHaveTextContent('10')
    expect(rows[1]).toHaveTextContent('5')
  })
})
