import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { NextTetromino } from './NextTetromino'

import type { Tetromino } from '../../types'

describe('NextTetromino component', () => {
  const tetrominoT: Tetromino = { shape: [[0, 3, 0], [3, 3, 3]], color: '#800080' }

  it('renders an empty box if tetromino is null', () => {
    render(<NextTetromino tetromino={null} />)
    const cells = screen.queryAllByTestId('cell')

    expect(cells.length).toBe(0)
  })

  it('renders the correct number of cells', () => {
    render(<NextTetromino tetromino={tetrominoT} />)
    const cells = screen.getAllByTestId('cell')

    expect(cells.length).toBe(4)
  })

  it('applies the correct color to the cells', () => {
    render(<NextTetromino tetromino={tetrominoT} />)
    const cells = screen.getAllByTestId('cell')

    cells.forEach(cell => {
      expect(cell).toHaveStyle('background-color: #800080')
    })
  })
})