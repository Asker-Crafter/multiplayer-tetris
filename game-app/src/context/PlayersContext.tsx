import { createContext } from 'react'

export interface Player {
  id: number
  name: string
  isAlive: boolean
  score: number
  lines: number
  level: number
  attackQueue: number
  attackTarget: number
}

export interface PlayersContextType {
  players: Player[]
  playerCount: number
  setPlayerCount: (count: number) => void
  setPlayerName: (id: number, name: string) => void
  initializePlayers: (playerNames?: string[]) => void
  updatePlayerStats: (id: number, stats: Partial<Player>) => void
  setPlayerAlive: (id: number, isAlive: boolean) => void
  addAttackToQueue: (targetId: number, count: number) => void
  clearAttackQueue: (playerId: number) => void
  setAttackTarget: (playerId: number, targetId: number) => void
  getWinner: () => Player | null
  resetPlayers: () => void
}

export const PlayersContext = createContext<PlayersContextType | undefined>(undefined)
