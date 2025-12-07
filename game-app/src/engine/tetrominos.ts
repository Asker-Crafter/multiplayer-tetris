import type { Tetromino } from '@my-app/ui-kit'

export const TETROMINOS: Record<string, Tetromino> = {
  I: { shape: [[1, 1, 1, 1]], color: '#00FFFF' },
  O: { shape: [[2, 2], [2, 2]], color: '#FFFF00' },
  T: { shape: [[0, 3, 0], [3, 3, 3]], color: '#800080' },
  S: { shape: [[0, 4, 4], [4, 4, 0]], color: '#00FF00' },
  Z: { shape: [[5, 5, 0], [0, 5, 5]], color: '#FF0000' },
  J: { shape: [[0, 0, 6], [6, 6, 6]], color: '#0000FF' },
  L: { shape: [[7, 0, 0], [7, 7, 7]], color: '#FFA500' },
}

export function getRandomTetromino(): Tetromino {
  const keys = Object.keys(TETROMINOS)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]

  return TETROMINOS[randomKey]
}