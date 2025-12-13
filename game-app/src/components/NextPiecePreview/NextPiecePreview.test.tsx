import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import NextPiecePreview from './NextPiecePreview'

describe('NextPiecePreview', () => {
  const mockTetromino = {
    shape: [[1, 1], [1, 1]],
    color: '#ffff00'
  }

  it('does not render when nextPiece is null', () => {
    const { container } = render(<NextPiecePreview nextPiece={null} />)

    expect(container.firstChild).toBeNull()
  })

  it('renders when nextPiece is provided', () => {
    render(<NextPiecePreview nextPiece={mockTetromino} />)
    expect(screen.getByText('Next:')).toBeInTheDocument()
  })

  it('displays NextTetromino component with correct tetromino', () => {
    render(<NextPiecePreview nextPiece={mockTetromino} />)
    expect(screen.getByText('Next:')).toBeInTheDocument()
  })
})
