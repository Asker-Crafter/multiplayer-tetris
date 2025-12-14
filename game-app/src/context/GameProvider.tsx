import { useState, useCallback, useContext, useRef, useEffect, useMemo } from 'react'

import { GameContext } from './GameContext'
import { PlayersContext } from './PlayersContext'
import { checkCollision } from '../engine/collision'
import { rotateTetromino } from '../engine/rotation'
import { clearLines, calculateScore, calculateLevel, calculateGarbageLines } from '../engine/scoring'
import { getRandomTetromino } from '../engine/tetrominos'
import { addGarbageLines } from '../multiplayer/attackSystem'
import { getNextTarget } from '../multiplayer/targetSelection'

import type { PlayerGameState } from './GameContext'
import type { GameBoard } from '@my-app/ui-kit'

const BOARD_HEIGHT = 20
const BOARD_WIDTH = 10
const STORAGE_KEY = 'tetris_game_state'

const createEmptyBoard = (): GameBoard => {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))
}

// Загрузка состояния из localStorage
const loadGameState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Не удалось загрузить состояние игры:', error)
  }

  return null
}

// Сохранение состояния в localStorage
const saveGameState = (gameStates: Record<number, PlayerGameState>, isGameStarted: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameStates, isGameStarted }))
  } catch (error) {
    console.error('Не удалось сохранить состояние игры:', error)
  }
}

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const playersContext = useContext(PlayersContext)
  const initialState = loadGameState()
  const [gameStates, setGameStates] = useState<Record<number, PlayerGameState>>(initialState?.gameStates || {})
  const [isGameStarted, setIsGameStarted] = useState(initialState?.isGameStarted || false)

  // Очередь для хранения побочных эффектов по каждому игроку
  const lockPieceSideEffectsQueue = useRef<Map<number, {
    attackToSend: { targetId: number; count: number } | null
    statsUpdate: { score: number; lines: number; level: number; attackQueue?: number }
    isGameOver: boolean
  }>>(new Map())

  const startGame = useCallback((playerNames?: string[]) => {
    if (!playersContext) return

    // Сначала инициализируем игроков
    playersContext.initializePlayers(playerNames)

    // Затем создаём игровые состояния на основе playerCount
    const newGameStates: Record<number, PlayerGameState> = {}

    for (let i = 0; i < playersContext.playerCount; i++) {
      newGameStates[i] = {
        board: createEmptyBoard(),
        currentPiece: getRandomTetromino(),
        currentX: 3,
        currentY: 0,
        nextPiece: getRandomTetromino(),
        isGameOver: false,
      }
    }

    setGameStates(newGameStates)
    setIsGameStarted(true)
  }, [playersContext])

  const resetGame = useCallback(() => {
    setGameStates({})
    setIsGameStarted(false)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const updateGameState = useCallback((playerId: number, state: Partial<PlayerGameState>) => {
    setGameStates(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], ...state },
    }))
  }, [])

  const movePiece = useCallback((playerId: number, dx: number, dy: number) => {
    setGameStates(prev => {
      const state = prev[playerId]

      if (!state || !state.currentPiece || state.isGameOver) return prev

      const newX = state.currentX + dx
      const newY = state.currentY + dy

      if (!checkCollision(state.board, state.currentPiece.shape, newX, newY)) {
        return {
          ...prev,
          [playerId]: { ...state, currentX: newX, currentY: newY },
        }
      }

      return prev
    })
  }, [])

  const rotatePiece = useCallback((playerId: number) => {
    setGameStates(prev => {
      const state = prev[playerId]

      if (!state || !state.currentPiece || state.isGameOver) return prev

      const rotated = rotateTetromino(state.currentPiece.shape)

      if (!checkCollision(state.board, rotated, state.currentX, state.currentY)) {
        return {
          ...prev,
          [playerId]: {
            ...state,
            currentPiece: { ...state.currentPiece, shape: rotated },
          },
        }
      }

      return prev
    })
  }, [])

  const dropPiece = useCallback((playerId: number) => {
    setGameStates(prev => {
      const state = prev[playerId]

      if (!state || !state.currentPiece || state.isGameOver) return prev

      let newY = state.currentY

      while (!checkCollision(state.board, state.currentPiece.shape, state.currentX, newY + 1)) {
        newY++
      }

      return {
        ...prev,
        [playerId]: { ...state, currentY: newY },
      }
    })
  }, [])

  const lockPiece = useCallback((playerId: number) => {
    if (!playersContext) return

    setGameStates(prev => {
      const state = prev[playerId]

      if (!state || !state.currentPiece) return prev

      // Размещаем фигуру на доске
      const newBoard = state.board.map(row => [...row])
      const piece = state.currentPiece

      for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col] !== 0) {
            const y = state.currentY + row
            const x = state.currentX + col

            if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
              newBoard[y][x] = piece.shape[row][col]
            }
          }
        }
      }

      // Очищаем линии
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard)

      const player = playersContext.players.find(p => p.id === playerId)

      if (!player) return prev

      const newTotalLines = player.lines + linesCleared
      const newLevel = calculateLevel(newTotalLines)
      const newScore = player.score + calculateScore(linesCleared, player.level)

      // 1. ЗАЩИТА - расчет отбитых линий (если есть входящие атаки)
      let defendedLines = 0
      let remainingGarbage = 0

      if (player.attackQueue > 0) {
        defendedLines = Math.min(linesCleared, player.attackQueue)
        remainingGarbage = player.attackQueue - defendedLines
      }

      // 2. ОСТАТОК - линии после защиты
      const remainingLines = linesCleared - defendedLines

      // 3. АТАКА - генерация на основе остатка + проверка мультиплеера
      const garbageGenerated = calculateGarbageLines(remainingLines)
      let attackToSend: { targetId: number; count: number } | null = null

      if (garbageGenerated > 0 && playersContext.playerCount > 1) {
        let targetId = player.attackTarget

        if (playersContext.playerCount === 2) {
          const otherPlayer = playersContext.players.find(p => p.id !== playerId && p.isAlive)

          if (otherPlayer) {
            targetId = otherPlayer.id
          }
        } else {
          const targetPlayer = playersContext.players.find(p => p.id === targetId)

          if (!targetPlayer || !targetPlayer.isAlive) {
            const aliveOpponent = playersContext.players.find(p => p.id !== playerId && p.isAlive)

            if (aliveOpponent) {
              targetId = aliveOpponent.id
            }
          }
        }

        attackToSend = { targetId, count: garbageGenerated }
      }

      // 4. СПАВН МУСОРА - оставшиеся входящие атаки
      let finalBoard = clearedBoard

      if (remainingGarbage > 0) {
        finalBoard = addGarbageLines(clearedBoard, remainingGarbage)
      }

      // 5. ОБНОВЛЕНИЕ СТАТИСТИКИ
      const statsUpdate: { score: number; lines: number; level: number; attackQueue?: number } = {
        score: newScore,
        lines: newTotalLines,
        level: newLevel,
        ...(player.attackQueue > 0 && { attackQueue: 0 })
      }

      const nextPiece = state.nextPiece || getRandomTetromino()
      const newPiece = getRandomTetromino()
      const isGameOver = checkCollision(finalBoard, nextPiece.shape, 3, 0)

      // Добавляем побочные эффекты в очередь для данного игрока
      lockPieceSideEffectsQueue.current.set(playerId, { attackToSend, statsUpdate, isGameOver })

      return {
        ...prev,
        [playerId]: {
          board: finalBoard,
          currentPiece: nextPiece,
          currentX: 3,
          currentY: 0,
          nextPiece: newPiece,
          isGameOver,
        },
      }
    })
  }, [playersContext])

  // Обработка очереди побочных эффектов после обновления состояния
  useEffect(() => {
    if (lockPieceSideEffectsQueue.current.size === 0) return

    // Обрабатываем все побочные эффекты из очереди
    lockPieceSideEffectsQueue.current.forEach((sideEffects, playerId) => {
      if (sideEffects.attackToSend) {
        playersContext?.addAttackToQueue(
          sideEffects.attackToSend.targetId,
          sideEffects.attackToSend.count
        )
      }
      playersContext?.updatePlayerStats(playerId, sideEffects.statsUpdate)

      if (sideEffects.isGameOver) {
        playersContext?.setPlayerAlive(playerId, false)
      }
    })

    // Очищаем очередь
    lockPieceSideEffectsQueue.current.clear()
  }, [gameStates, playersContext])

  // Создаем строку состояния игроков для зависимости useEffect
  const playersStateKey = useMemo(() => {
    return playersContext?.players.map(p => `${p.id}-${p.isAlive}`).join(',') || ''
  }, [playersContext?.players])

  // Автоматическое переключение target при выбывании цели
  useEffect(() => {
    if (!playersContext || playersContext.playerCount < 3) return

    playersContext.players.forEach(player => {
      if (!player.isAlive) return

      const targetPlayer = playersContext.players.find(p => p.id === player.attackTarget)

      // Если цель мертва, переключаемся на следующую живую
      if (!targetPlayer || !targetPlayer.isAlive) {
        const newTarget = getNextTarget(
          player.attackTarget,
          playersContext.players,
          player.id
        )

        // Переключаем только если новая цель отличается от текущей
        if (newTarget !== player.attackTarget) {
          playersContext.setAttackTarget(player.id, newTarget)
        }
      }
    })
  }, [playersStateKey, playersContext?.playerCount, playersContext])

  // Автосохранение игрового состояния в localStorage при изменениях
  useEffect(() => {
    if (isGameStarted && Object.keys(gameStates).length > 0) {
      saveGameState(gameStates, isGameStarted)
    }
  }, [gameStates, isGameStarted])

  return (
    <GameContext.Provider
      value={{
        gameStates,
        isGameStarted,
        startGame,
        resetGame,
        updateGameState,
        movePiece,
        rotatePiece,
        dropPiece,
        lockPiece,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
