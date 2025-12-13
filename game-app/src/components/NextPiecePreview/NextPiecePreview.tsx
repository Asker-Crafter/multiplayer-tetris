import React, { memo } from 'react'

import { NextTetromino } from '@my-app/ui-kit'

import type { Tetromino } from '@my-app/ui-kit'

interface NextPiecePreviewProps {
  nextPiece: Tetromino | null
}

const NextPiecePreview = memo(({ nextPiece }: NextPiecePreviewProps) => {
  if (!nextPiece) return null

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#1a1a1a',
      border: '2px solid #333',
      borderRadius: '8px',
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>Next:</h4>
      <NextTetromino tetromino={nextPiece} />
    </div>
  )
})

export default NextPiecePreview
