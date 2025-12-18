import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GameContextType {
  // Состояние игры (поля всех игроков, их фигуры, счет, уровень)
}

export const GameContext = createContext<GameContextType | undefined>(undefined)
