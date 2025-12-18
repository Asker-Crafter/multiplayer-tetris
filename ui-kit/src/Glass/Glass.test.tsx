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
    expect(cells[1]).toHaveStyle('background-color: #00FFFF')
    expect(cells[2]).toHaveStyle('background-color: #FFFF00')
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
})