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
      backgroundColor: '#001076ff',
      border: '1px dashed #ffffff',
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#ffffff', textAlign: 'center' }}>Следующая фигура:</h4>
      <div style={{ justifyContent: 'center', display: 'flex' }}><NextTetromino tetromino={nextPiece} /></div>
    </div>
  )
})

export default NextPiecePreview
