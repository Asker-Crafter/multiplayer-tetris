import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { Glass } from './Glass'

import type { GameBoard } from '../../types'

describe('Glass component', () => {
  it('renders a default board when board prop is an empty array', () => {
    render(<Glass board={[]} />)
    const cells = screen.getAllByTestId('cell')

    expect(cells.length).toBe(200)
  })

  it('renders a board with specific colored cells', () => {
    const testBoard: GameBoard = [[0, 1], [2, 0]]

    render(<Glass board={testBoard} />)
    const cells = screen.getAllByTestId('cell')

    expect(cells.length).toBe(4)
    expect(cells[1]).toHaveStyle('background-color: #2d00f7')
    expect(cells[2]).toHaveStyle('background-color: #e500a4')
  })

  it('uses a fallback color for out-of-range cell values', () => {
    const testBoard: GameBoard = [[99]]

    render(<Glass board={testBoard} />)
    const cell = screen.getByTestId('cell')

    expect(cell).toHaveStyle('background-color: #1a1a1a')
  })

  it('renders a default board when board prop is undefined', () => {
    render(<Glass board={undefined} />)
    const cells = screen.getAllByTestId('cell')

    expect(cells.length).toBe(200)
  })

  it('handles board with an empty row', () => {
    const testBoard: GameBoard = [[]]

    render(<Glass board={testBoard} />)
    const cells = screen.queryAllByTestId('cell')

    expect(cells.length).toBe(0)
  })

  describe('Glass memoization', () => {
    it('should re-render when board dimensions change', () => {
      const initialBoard: GameBoard = [[1, 2], [3, 4]]
      const { rerender } = render(<Glass board={initialBoard} />)

      let cells = screen.getAllByTestId('cell')

      expect(cells.length).toBe(4)

      const newBoard: GameBoard = [[1, 2, 3], [4, 5, 6]]

      rerender(<Glass board={newBoard} />)

      cells = screen.getAllByTestId('cell')
      expect(cells.length).toBe(6)
    })

    it('should re-render when board cell values change', () => {
      const initialBoard: GameBoard = [[0, 0], [0, 0]]
      const { rerender } = render(<Glass board={initialBoard} />)

      let cells = screen.getAllByTestId('cell')

      expect(cells[0]).toHaveStyle('background-color: #1a1a1a')

      const newBoard: GameBoard = [[1, 2], [3, 4]]

      rerender(<Glass board={newBoard} />)

      cells = screen.getAllByTestId('cell')
      expect(cells[0]).toHaveStyle('background-color: #2d00f7')
      expect(cells[1]).toHaveStyle('background-color: #e500a4')
    })

    it('should NOT re-render when board reference changes but content is same', () => {
      const board1: GameBoard = [[1, 2], [3, 4]]
      const { rerender } = render(<Glass board={board1} />)

      const board2: GameBoard = [[1, 2], [3, 4]]

      rerender(<Glass board={board2} />)

      const cells = screen.getAllByTestId('cell')

      expect(cells.length).toBe(4)
      expect(cells[0]).toHaveStyle('background-color: #2d00f7')
    })

    it('should re-render when row length changes', () => {
      const initialBoard: GameBoard = [[1, 2]]
      const { rerender } = render(<Glass board={initialBoard} />)

      let cells = screen.getAllByTestId('cell')

      expect(cells.length).toBe(2)

      const newBoard: GameBoard = [[1]]

      rerender(<Glass board={newBoard} />)

      cells = screen.getAllByTestId('cell')
      expect(cells.length).toBe(1)
    })

    it('should handle transition from undefined to defined board', () => {
      const { rerender } = render(<Glass board={undefined} />)

      let cells = screen.getAllByTestId('cell')

      expect(cells.length).toBe(200)

      const newBoard: GameBoard = [[1, 2]]

      rerender(<Glass board={newBoard} />)

      cells = screen.getAllByTestId('cell')
      expect(cells.length).toBe(2)
    })
  })
})