import React from 'react'

import styles from './Glass.module.css'

import type { GameBoard } from '../types'

const COLORS = ['#1a1a1a', '#00FFFF', '#FFFF00', '#800080', '#00FF00', '#FF0000', '#0000FF', '#FFA500']
const DEFAULT_BOARD: GameBoard = Array.from({ length: 20 }, () => Array(10).fill(0))

export interface GlassProps {
  board: GameBoard;
}

export const Glass: React.FC<GlassProps> = ({ board = DEFAULT_BOARD }) => {
  const displayBoard = board.length > 0 ? board : DEFAULT_BOARD

  return (
    <div className={styles.glassGrid} style={{ gridTemplateColumns: `repeat(${displayBoard[0]?.length || 10}, 25px)` }}>
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={styles.cell}
            style={{ backgroundColor: COLORS[cell] || COLORS[0] }}
            data-testid="cell"
          />
        )),
      )}
    </div>
  )
}