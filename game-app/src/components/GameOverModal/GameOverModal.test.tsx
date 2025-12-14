import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import GameOverModal from './GameOverModal'

describe('GameOverModal', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<GameOverModal isOpen={false} playerNames={['Player 1']} />)

    expect(container.firstChild).toBeNull()
  })

  it('renders when isOpen is true', () => {
    render(<GameOverModal isOpen={true} playerNames={['Player 1']} />)
    expect(screen.getByText('Игра окончена!')).toBeInTheDocument()
  })

  it('displays the correct player name for single player', () => {
    render(<GameOverModal isOpen={true} playerNames={['John Doe']} />)
    expect(screen.getByText('John Doe был выбит из игры')).toBeInTheDocument()
  })

  it('displays elimination message for single player', () => {
    render(<GameOverModal isOpen={true} playerNames={['Player 2']} />)
    expect(screen.getByText(/был выбит из игры/)).toBeInTheDocument()
  })

  it('displays two eliminated players correctly', () => {
    render(<GameOverModal isOpen={true} playerNames={['Player 1', 'Player 2']} />)
    expect(screen.getByText('Выбыли Player 1 и Player 2')).toBeInTheDocument()
  })

  it('displays three eliminated players correctly', () => {
    render(<GameOverModal isOpen={true} playerNames={['Player 1', 'Player 2', 'Player 3']} />)
    expect(screen.getByText('Выбыли Player 1, Player 2 и Player 3')).toBeInTheDocument()
  })
})
