import React, { memo } from 'react'

import { NextTetromino } from '@my-app/ui-kit'

import styles from './NextPiecePreview.module.css'

import type { Tetromino } from '@my-app/ui-kit'

interface NextPiecePreviewProps {
  nextPiece: Tetromino | null
}

const NextPiecePreview = memo(({ nextPiece }: NextPiecePreviewProps) => {
  if (!nextPiece) return null

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Следующая фигура:</h4>
      <div className={styles.preview}>
        <NextTetromino tetromino={nextPiece} />
      </div>
    </div>
  )
})

export default NextPiecePreview
