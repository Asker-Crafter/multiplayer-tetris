import type { GameBoard } from '@my-app/ui-kit'

export const clearLines = (board: GameBoard): { newBoard: GameBoard; linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell === 0))
  const linesCleared = board.length - newBoard.length

  const emptyLines = Array.from({ length: linesCleared }, () => Array(board[0].length).fill(0))

  return { newBoard: [...emptyLines, ...newBoard], linesCleared }
}

export const calculateScore = (linesCleared: number, level: number): number => {
  const basePoints = [0, 40, 100, 300, 1200]

  return basePoints[linesCleared] * level
}

export const calculateLevel = (totalLinesCleared: number): number => {
  return Math.floor(totalLinesCleared / 10) + 1
}

export const calculateGarbageLines = (linesCleared: number): number => {
  if (linesCleared === 2) return 1
  if (linesCleared === 3) return 2
  if (linesCleared === 4) return 4

  return 0
}
