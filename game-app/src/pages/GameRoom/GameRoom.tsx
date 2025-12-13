import { useContext, useEffect, useCallback, useRef, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import AttackQueue from '../../components/AttackQueue'
import GameOverModal from '../../components/GameOverModal'
import NextPiecePreview from '../../components/NextPiecePreview'
import ScorePanel from '../../components/ScorePanel'
import TetrisBoard from '../../components/TetrisBoard'
import { GameContext } from '../../context/GameContext'
import { PlayersContext } from '../../context/PlayersContext'
import { checkCollision } from '../../engine/collision'
import { getNextTarget } from '../../multiplayer/targetSelection'
import { getPlayerForKey, getActionForKey } from '../../utils/keyboard'

import type { PlayerGameState } from '../../context/GameContext'
import type { Player } from '../../context/PlayersContext'

const GameRoom = () => {
  const navigate = useNavigate()
  const gameContext = useContext(GameContext)
  const playersContext = useContext(PlayersContext)
  const gameOverShownRef = useRef<Set<number>>(new Set())
  const gameStatesRef = useRef<Record<number, PlayerGameState>>({})
  const playersRef = useRef<Player[]>([])
  const [isReady, setIsReady] = useState(false)

  const { gameStates = {}, movePiece = () => {}, rotatePiece = () => {}, dropPiece = () => {}, lockPiece = () => {} } = gameContext || {}
  const { players = [], setAttackTarget = () => {}, getWinner = () => null } = playersContext || {}

  // Throttle для движения фигур
  const throttleTimers = useRef<Record<string, number>>({})

  const throttledMove = useCallback((playerId: number, dx: number, dy: number) => {
    const key = `${playerId}-${dx}-${dy}`
    const now = Date.now()
    const lastCall = throttleTimers.current[key] || 0

    if (now - lastCall >= 50) {
      throttleTimers.current[key] = now
      movePiece(playerId, dx, dy)
    }
  }, [movePiece])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!gameContext || !playersContext) return

    // Игнорируем повторные события при удержании клавиши для действий движения
    const playerId = getPlayerForKey(event.key)

    if (playerId === null) return

    const player = players[playerId]
    const gameState = gameStates[playerId]

    if (!player || !gameState || !player.isAlive || gameState.isGameOver) return

    const action = getActionForKey(playerId, event.key)

    if (!action) return

    event.preventDefault()

    // Для left, right, down используем throttle
    // Для rotate, drop, changeTarget - мгновенный отклик без throttle
    switch (action) {
    case 'left':
      throttledMove(playerId, -1, 0)
      break
    case 'right':
      throttledMove(playerId, 1, 0)
      break
    case 'down':
      throttledMove(playerId, 0, 1)
      break
    case 'rotate':
      if (event.repeat) return
      rotatePiece(playerId)
      break
    case 'drop':
      if (event.repeat) return
      dropPiece(playerId)
      break
    case 'changeTarget':
      if (event.repeat) return
      if (players.length > 2) {
        const newTarget = getNextTarget(player.attackTarget, players.length, playerId)

        setAttackTarget(playerId, newTarget)
      }
      break
    }
  }, [gameContext, playersContext, players, gameStates, throttledMove, rotatePiece, dropPiece, setAttackTarget])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Синхронизируем refs с актуальным состоянием
  useEffect(() => {
    gameStatesRef.current = gameStates
  }, [gameStates])

  useEffect(() => {
    playersRef.current = players
  }, [players])

  // Wait for game states to initialize before rendering
  useEffect(() => {
    if (!gameContext || !playersContext) {
      setIsReady(false)
      return
    }

    const { isGameStarted, gameStates } = gameContext
    const { players } = playersContext

    if (isGameStarted && players.length > 0) {
      const allStatesExist = players.every(player => gameStates[player.id])
      setIsReady(allStatesExist)
    } else {
      setIsReady(false)
    }
  }, [gameContext?.isGameStarted, gameContext?.gameStates, playersContext?.players])

  // Создаем стабильный ключ для пересоздания интервалов только когда меняется isAlive или level
  const intervalsKey = useMemo(() => {
    return players
      .filter(p => p.isAlive)
      .map(p => `${p.id}-${p.level}`)
      .join(',')
  }, [players.map(p => `${p.id}-${p.isAlive}-${p.level}`).join(',')])

  useEffect(() => {
    const intervals = playersRef.current.map(player => {
      if (!player.isAlive) return null

      const gameState = gameStatesRef.current[player.id]

      if (!gameState || gameState.isGameOver) return null

      const speed = Math.max(100, 1000 - player.level * 100)

      return setInterval(() => {
        // Используем актуальное состояние из refs
        const state = gameStatesRef.current[player.id]
        const currentPlayer = playersRef.current.find(p => p.id === player.id)

        if (!state || !state.currentPiece || !currentPlayer?.isAlive || state.isGameOver) return

        if (checkCollision(state.board, state.currentPiece.shape, state.currentX, state.currentY + 1)) {
          lockPiece(player.id)
        } else {
          movePiece(player.id, 0, 1)
        }
      }, speed)
    })

    return () => {
      intervals.forEach(interval => {
        if (interval) clearInterval(interval)
      })
    }
  }, [intervalsKey, movePiece, lockPiece])

  useEffect(() => {
    const winner = getWinner()

    if (winner) {
      setTimeout(() => navigate('/results'), 2000)
    }
  }, [players, getWinner, navigate])

  if (!gameContext || !playersContext || !isReady) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>МУЛЬТИПЛЕЕРНЫЙ ТЕТРИС</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${players.length}, 1fr)`,
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {players.map(player => {
          const gameState = gameStates[player.id]

          if (!gameState) return null

          const showGameOver = gameState.isGameOver && !gameOverShownRef.current.has(player.id)

          if (showGameOver) {
            gameOverShownRef.current.add(player.id)
            setTimeout(() => gameOverShownRef.current.delete(player.id), 3000)
          }

          return (
            <div key={player.id} style={{
              opacity: player.isAlive ? 1 : 0.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{
                width: '100%',
                maxWidth: '220px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
              }}>
                <ScorePanel
                  score={player.score}
                  lines={player.lines}
                  level={player.level}
                  playerName={player.name}
                />

                <TetrisBoard
                  board={gameState.board}
                  currentPiece={gameState.currentPiece}
                  currentX={gameState.currentX}
                  currentY={gameState.currentY}
                />

                <NextPiecePreview nextPiece={gameState.nextPiece} />

                {playersContext.playerCount > 1 && <AttackQueue count={player.attackQueue} />}

                {players.length > 2 && player.isAlive && (
                  <div style={{
                    padding: '10px',
                    backgroundColor: '#4e0093ff',
                    borderRadius: '4px',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                    Цель атаки: {players[player.attackTarget]?.name}
                  </div>
                )}
              </div>

              <GameOverModal isOpen={showGameOver} playerName={player.name} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GameRoom
