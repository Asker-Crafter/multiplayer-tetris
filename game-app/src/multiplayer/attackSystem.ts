import type { GameBoard } from '@my-app/ui-kit'

export interface AttackQueue {
  count: number
}

export const addGarbageLines = (board: GameBoard, count: number): GameBoard => {
  const newBoard = [...board]

  newBoard.splice(0, count)

  for (let i = 0; i < count; i++) {
    const garbageLine = Array(board[0].length).fill(8)
    const holeIndex = Math.floor(Math.random() * board[0].length)

    garbageLine[holeIndex] = 0
    newBoard.push(garbageLine)
  }

  return newBoard
}

export const cancelAttack = (attackQueue: number, linesCleared: number): { remainingAttack: number; garbageToAdd: number } => {
  const cancelled = Math.min(attackQueue, linesCleared)

  return {
    remainingAttack: attackQueue - cancelled,
    garbageToAdd: 0,
  }
}
