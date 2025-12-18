import React from 'react'

import { render } from '@testing-library/react'

import '@testing-library/jest-dom'
import TetrisBoard from './TetrisBoard'

describe('TetrisBoard', () => {
  const emptyBoard = Array(20).fill(null).map(() => Array(10).fill(0))

  it('renders with empty board', () => {
    const { container } = render(<TetrisBoard board={emptyBoard} />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders board without current piece', () => {
    const { container } = render(<TetrisBoard board={emptyBoard} currentPiece={null} />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders board with current piece', () => {
    const piece = {
      shape: [[1, 1], [1, 1]],
      color: '#ffff00',
      border: '#cccc00'
    }
    const { container } = render(
      <TetrisBoard board={emptyBoard} currentPiece={piece} currentX={4} currentY={0} />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with current piece at different position', () => {
    const piece = {
      shape: [[1, 0], [1, 1], [0, 1]],
      color: '#00ff00',
      border: '#00cc00'
    }
    const { container } = render(
      <TetrisBoard board={emptyBoard} currentPiece={piece} currentX={2} currentY={5} />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('handles board with existing pieces', () => {
    const boardWithPieces = emptyBoard.map((row, y) =>
      row.map((cell, x) => (y === 19 && x < 5) ? 1 : 0)
    )
    const { container } = render(<TetrisBoard board={boardWithPieces} />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('uses default position values', () => {
    const piece = {
      shape: [[1, 1, 1, 1]],
      color: '#00ffff',
      border: '#00cccc'
    }
    const { container } = render(<TetrisBoard board={emptyBoard} currentPiece={piece} />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
