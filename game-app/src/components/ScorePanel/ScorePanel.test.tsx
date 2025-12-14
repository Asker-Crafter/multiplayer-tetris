import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import ScorePanel from './ScorePanel'

describe('ScorePanel', () => {
  const defaultProps = {
    score: 1000,
    lines: 10,
    level: 5,
    playerName: 'Player 1'
  }

  it('renders player name', () => {
    render(<ScorePanel {...defaultProps} />)
    expect(screen.getByText('Player 1')).toBeInTheDocument()
  })

  it('displays score correctly', () => {
    render(<ScorePanel {...defaultProps} />)
    expect(screen.getByText(/Счёт:/)).toBeInTheDocument()
    expect(screen.getByText(/1000/)).toBeInTheDocument()
  })

  it('displays lines correctly', () => {
    render(<ScorePanel {...defaultProps} />)
    expect(screen.getByText(/Уничтожено линий:/)).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('displays level correctly', () => {
    render(<ScorePanel {...defaultProps} />)
    expect(screen.getByText(/Уровень:/)).toBeInTheDocument()
    expect(screen.getByText(/5/)).toBeInTheDocument()
  })

  it('renders with zero values', () => {
    render(<ScorePanel score={0} lines={0} level={0} playerName="New Player" />)
    expect(screen.getByText('New Player')).toBeInTheDocument()
    expect(screen.getByText(/Счёт:/)).toBeInTheDocument()
    expect(screen.getAllByText('0')).toHaveLength(3)
  })

  it('renders all stat labels', () => {
    render(<ScorePanel {...defaultProps} />)
    expect(screen.getByText(/Счёт:/)).toBeInTheDocument()
    expect(screen.getByText(/Уничтожено линий:/)).toBeInTheDocument()
    expect(screen.getByText(/Уровень:/)).toBeInTheDocument()
  })
})
