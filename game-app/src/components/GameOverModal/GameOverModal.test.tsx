import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import GameOverModal from './GameOverModal'

describe('GameOverModal', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<GameOverModal isOpen={false} playerName="Player 1" />)

    expect(container.firstChild).toBeNull()
  })

  it('renders when isOpen is true', () => {
    render(<GameOverModal isOpen={true} playerName="Player 1" />)
    expect(screen.getByText('Game Over!')).toBeInTheDocument()
  })

  it('displays the correct player name', () => {
    render(<GameOverModal isOpen={true} playerName="John Doe" />)
    expect(screen.getByText('John Doe has been eliminated')).toBeInTheDocument()
  })

  it('displays elimination message', () => {
    render(<GameOverModal isOpen={true} playerName="Player 2" />)
    expect(screen.getByText(/has been eliminated/)).toBeInTheDocument()
  })
})
