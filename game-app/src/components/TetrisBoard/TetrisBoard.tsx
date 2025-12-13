import { useMemo, memo } from 'react'

import { Glass } from '@my-app/ui-kit'

import type { GameBoard } from '@my-app/ui-kit'

interface TetrisBoardProps {
  board: GameBoard
  currentPiece?: { shape: number[][]; color: string } | null
  currentX?: number
  currentY?: number
}

const TetrisBoard = memo(({ board, currentPiece, currentX = 0, currentY = 0 }: TetrisBoardProps) => {
  const displayBoard = useMemo(() => {
    if (!currentPiece) return board

    const newBoard = board.map(row => [...row])

    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col] !== 0) {
          const y = currentY + row
          const x = currentX + col

          if (y >= 0 && y < board.length && x >= 0 && x < board[0].length) {
            newBoard[y][x] = currentPiece.shape[row][col]
          }
        }
      }
    }

    return newBoard
  }, [board, currentPiece, currentX, currentY])

  return <Glass board={displayBoard} />
})

export default TetrisBoard
