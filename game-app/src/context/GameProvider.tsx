import { GameContext } from './GameContext'

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GameContext.Provider value={{}}>
      {children}
    </GameContext.Provider>
  )
}
