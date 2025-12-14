import type { Tetromino } from '@my-app/ui-kit'

export const TETROMINOS: Record<string, Tetromino> = {
  I: { shape: [[1, 1, 1, 1]], color: '#2d00f7', border: '1px solid #ffffff' },
  O: { shape: [[2, 2], [2, 2]], color: '#e500a4', border: '1px solid #ffffff' },
  T: { shape: [[0, 3, 0], [3, 3, 3]], color: '#f20089', border: '1px solid #ffffff' },
  S: { shape: [[0, 4, 4], [4, 4, 0]], color: '#ffb600', border: '1px solid #ffffff' },
  Z: { shape: [[5, 5, 0], [0, 5, 5]], color: '#6a00f4', border: '1px solid #ffffff' },
  J: { shape: [[0, 0, 6], [6, 6, 6]], color: '#8900f2', border: '1px solid #ffffff' },
  L: { shape: [[7, 0, 0], [7, 7, 7]], color: '#bc00dd', border: '1px solid #ffffff' },
}

export function getRandomTetromino(): Tetromino {
  const keys = Object.keys(TETROMINOS)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]

  return TETROMINOS[randomKey]
}