import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PlayersContextType {
  // Информация об игроках (имена, статусы, очереди атак)
}

export const PlayersContext = createContext<PlayersContextType | undefined>(undefined)
