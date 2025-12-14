import { useState, useCallback, useEffect } from 'react'

import { PlayersContext } from './PlayersContext'

import type { Player } from './PlayersContext'

const STORAGE_KEY = 'tetris_players_state'

// Load state from localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Failed to load players state:', error)
  }

  return null
}

// Save state to localStorage
const saveState = (players: Player[], playerCount: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ players, playerCount }))
  } catch (error) {
    console.error('Failed to save players state:', error)
  }
}

export const PlayersProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = loadState()
  const [players, setPlayers] = useState<Player[]>(initialState?.players || [])
  const [playerCount, setPlayerCount] = useState(initialState?.playerCount || 1)

  const setPlayerName = useCallback((id: number, name: string) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, name } : p))
  }, [])

  const initializePlayers = useCallback((playerNames?: string[]) => {
    const newPlayers: Player[] = Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      name: playerNames?.[i] || `Player ${i + 1}`,
      isAlive: true,
      score: 0,
      lines: 0,
      level: 1,
      attackQueue: 0,
      attackTarget: (i + 1) % playerCount,
    }))

    setPlayers(newPlayers)
  }, [playerCount])

  const updatePlayerStats = useCallback((id: number, stats: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...stats } : p))
  }, [])

  const setPlayerAlive = useCallback((id: number, isAlive: boolean) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, isAlive } : p))
  }, [])

  const addAttackToQueue = useCallback((targetId: number, count: number) => {
    console.log(`addAttackToQueue: targetId=${targetId}, count=${count}`)
    setPlayers(prev => {
      const updated = prev.map(p =>
        p.id === targetId ? { ...p, attackQueue: p.attackQueue + count } : p
      )
      const target = updated.find(p => p.id === targetId)

      console.log(`Player ${targetId} attackQueue is now: ${target?.attackQueue}`)

      return updated
    })
  }, [])

  const clearAttackQueue = useCallback((playerId: number) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, attackQueue: 0 } : p))
  }, [])

  const setAttackTarget = useCallback((playerId: number, targetId: number) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, attackTarget: targetId } : p))
  }, [])

  const getWinner = useCallback(() => {
    const alivePlayers = players.filter(p => p.isAlive)

    // Соло-режим: игрок "выиграл" (завершил игру) когда умер
    if (playerCount === 1) {
      // В соло возвращаем игрока как "winner" только если он умер (для показа результатов)
      return alivePlayers.length === 0 ? players[0] : null
    }

    // Мультиплеер: последний выживший = победитель
    return alivePlayers.length === 1 ? alivePlayers[0] : null
  }, [players, playerCount])

  const resetPlayers = useCallback(() => {
    setPlayers([])
    setPlayerCount(1)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Auto-save state to localStorage whenever it changes
  useEffect(() => {
    if (players.length > 0) {
      saveState(players, playerCount)
    }
  }, [players, playerCount])

  return (
    <PlayersContext.Provider
      value={{
        players,
        playerCount,
        setPlayerCount,
        setPlayerName,
        initializePlayers,
        updatePlayerStats,
        setPlayerAlive,
        addAttackToQueue,
        clearAttackQueue,
        setAttackTarget,
        getWinner,
        resetPlayers,
      }}
    >
      {children}
    </PlayersContext.Provider>
  )
}
