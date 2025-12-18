import type { GameBoard } from '@my-app/ui-kit'

export const checkCollision = (
  board: GameBoard,
  shape: number[][],
  x: number,
  y: number,
): boolean => {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] !== 0) {
        const newY = y + row
        const newX = x + col

        if (
          newX < 0 ||
          newX >= board[0].length ||
          newY >= board.length ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return true
        }
      }
    }
  }

  return false
}
