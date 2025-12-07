import React from 'react'

import styles from './NextTetromino.module.css'

import type { Tetromino } from '../types'

export interface NextTetrominoProps {
  tetromino: Tetromino | null;
}

export const NextTetromino: React.FC<NextTetrominoProps> = ({ tetromino }) => {
  if (!tetromino) {
    return <div className={styles.previewBox} data-testid="empty-preview" />
  }

  const { shape, color } = tetromino
  const boxSize = 5
  const shapeHeight = shape.length
  const shapeWidth = shape[0].length
  const topPadding = Math.floor((boxSize - shapeHeight) / 2)
  const leftPadding = Math.floor((boxSize - shapeWidth) / 2)

  return (
    <div className={styles.previewBox}>
      {shape.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <div
              key={`${y}-${x}`}
              className={styles.cell}
              style={{
                backgroundColor: color,
                gridRowStart: y + 1 + topPadding,
                gridColumnStart: x + 1 + leftPadding,
              }}
              data-testid="cell"
            />
          ) : null,
        ),
      )}
    </div>
  )
}