import React, { memo } from 'react'

import styles from './Glass.module.css'

import type { GameBoard } from '../types'

const COLORS = ['#1a1a1a', '#2d00f7', '#e500a4', '#f20089', '#ffb600', '#6a00f4', '#8900f2', '#bc00dd', '#808080']
const DEFAULT_BOARD: GameBoard = Array.from({ length: 20 }, () => Array(10).fill(0))

export interface GlassProps {
  board: GameBoard;
}

export const Glass: React.FC<GlassProps> = memo(({ board = DEFAULT_BOARD }) => {
  const displayBoard = board.length > 0 ? board : DEFAULT_BOARD

  return (
    <div className={styles.glassGrid} style={{ gridTemplateColumns: `repeat(${displayBoard[0]?.length || 10}, 15px)` }}>
      {displayBoard.map((row: number[], y: number) =>
        row.map((cell: number, x: number) => (
          <div
            key={`${y}-${x}`}
            className={`${styles.cell} ${cell !== 0 ? styles.cellFilled : ''}`}
            style={{ backgroundColor: COLORS[cell] || COLORS[0] }}
            data-testid="cell"
          />
        )),
      )}
    </div>
  )
}, (prevProps, nextProps) => {
  // Глубокое сравнение board массива для предотвращения лишних рендеров
  const prevBoard = prevProps.board || DEFAULT_BOARD
  const nextBoard = nextProps.board || DEFAULT_BOARD

  if (prevBoard.length !== nextBoard.length) return false

  for (let i = 0; i < prevBoard.length; i++) {
    if (prevBoard[i].length !== nextBoard[i].length) return false

    for (let j = 0; j < prevBoard[i].length; j++) {
      if (prevBoard[i][j] !== nextBoard[i][j]) return false
    }
  }

  return true
})