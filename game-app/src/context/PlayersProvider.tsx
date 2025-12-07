import { PlayersContext } from './PlayersContext'

export const PlayersProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PlayersContext.Provider value={{}}>
      {children}
    </PlayersContext.Provider>
  )
}
