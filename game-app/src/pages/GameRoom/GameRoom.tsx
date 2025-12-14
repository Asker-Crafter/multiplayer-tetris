import { useContext, useEffect, useCallback, useRef, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './GameRoom.module.css'
import AttackQueue from '../../components/AttackQueue'
import GameOverModal from '../../components/GameOverModal'
import NextPiecePreview from '../../components/NextPiecePreview'
import ScorePanel from '../../components/ScorePanel'
import TetrisBoard from '../../components/TetrisBoard'
import { GameContext } from '../../context/GameContext'
import { PlayersContext } from '../../context/PlayersContext'
import { checkCollision } from '../../engine/collision'
import { getNextTarget, canChangeTarget } from '../../multiplayer/targetSelection'
import { getPlayerForKey, getActionForKey } from '../../utils/keyboard'

import type { PlayerGameState } from '../../context/GameContext'
import type { Player } from '../../context/PlayersContext'

const GameRoom = () => {
  const navigate = useNavigate()
  const gameContext = useContext(GameContext)
  const playersContext = useContext(PlayersContext)
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
    const playerId = getPlayerForKey(event.code)

    if (playerId === null) return

    const player = players[playerId]
    const gameState = gameStates[playerId]

    if (!player || !gameState || !player.isAlive || gameState.isGameOver) return

    const action = getActionForKey(playerId, event.code)

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

      if (players.length > 2 && canChangeTarget(players, playerId)) {
        const newTarget = getNextTarget(player.attackTarget, players, playerId)

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

  // Ожидание инициализации игровых состояний перед рендером
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
  }, [gameContext, playersContext])

  // Создаем стабильный ключ для пересоздания интервалов только когда меняется isAlive или level
  const intervalsKey = useMemo(() => {
    return players
      .filter(p => p.isAlive)
      .map(p => `${p.id}-${p.level}`)
      .join(',')
  }, [players])

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
    return <div>Загрузка...</div>
  }

  return (
    <div>
      <h2 className={styles.title}>МУЛЬТИПЛЕЕРНЫЙ ТЕТРИС</h2>

      <div
        className={styles.playersGrid}
        style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}
      >
        {players.map(player => {
          const gameState = gameStates[player.id]

          if (!gameState) return null

          // Находим всех выбывших игроков
          const deadPlayers = players.filter(p => !p.isAlive)
          const lastDeadPlayer = deadPlayers[deadPlayers.length - 1]
          const shouldShowModal = gameState.isGameOver &&
                                   players.filter(p => p.isAlive).length <= 1 &&
                                   player.id === lastDeadPlayer?.id
          const deadPlayerNames = deadPlayers.map(p => p.name)

          return (
            <div
              key={player.id}
              className={`${styles.playerContainer} ${!player.isAlive ? styles.dead : ''}`}
            >
              <div className={styles.playerComponents}>
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
                  <div className={`${styles.attackTarget} ${!canChangeTarget(players, player.id) ? styles.locked : ''}`}>
                    Цель атаки: {players[player.attackTarget]?.name}
                    {!canChangeTarget(players, player.id) && ' (заблокировано)'}
                  </div>
                )}
              </div>

              <GameOverModal
                isOpen={shouldShowModal}
                playerNames={deadPlayerNames}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GameRoom
