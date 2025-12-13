import { createContext } from 'react'

import type { GameBoard, Tetromino } from '@my-app/ui-kit'

export interface PlayerGameState {
  board: GameBoard
  currentPiece: Tetromino | null
  currentX: number
  currentY: number
  nextPiece: Tetromino | null
  isGameOver: boolean
}

export interface GameContextType {
  gameStates: Record<number, PlayerGameState>
  isGameStarted: boolean
  startGame: (playerNames?: string[]) => void
  resetGame: () => void
  updateGameState: (playerId: number, state: Partial<PlayerGameState>) => void
  movePiece: (playerId: number, dx: number, dy: number) => void
  rotatePiece: (playerId: number) => void
  dropPiece: (playerId: number) => void
  lockPiece: (playerId: number) => void
}

export const GameContext = createContext<GameContextType | undefined>(undefined)
