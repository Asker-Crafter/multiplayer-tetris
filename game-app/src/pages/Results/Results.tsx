import { useContext } from 'react'

import { Button, Scoreboard } from '@my-app/ui-kit'
import { useNavigate } from 'react-router-dom'

import styles from './Results.module.css'
import { GameContext } from '../../context/GameContext'
import { PlayersContext } from '../../context/PlayersContext'

const Results = () => {
  const navigate = useNavigate()
  const playersContext = useContext(PlayersContext)
  const gameContext = useContext(GameContext)

  if (!playersContext || !gameContext) {
    return <div>Загрузка...</div>
  }

  const sortedPlayers = [...playersContext.players].sort((a, b) => {
    if (a.isAlive && !b.isAlive) return -1
    if (!a.isAlive && b.isAlive) return 1

    return b.score - a.score
  })

  const handlePlayAgain = () => {
    gameContext.resetGame()
    playersContext.resetPlayers()
    navigate('/lobby')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>РЕЗУЛЬТАТЫ</h1>

      {sortedPlayers.length > 0 && sortedPlayers[0].isAlive && (
        <div className={styles.winnerBanner}>
          <h2 className={styles.winnerText}>Победитель: {sortedPlayers[0].name}</h2>
        </div>
      )}

      <Scoreboard
        players={sortedPlayers.map((player, index) => ({
          name: player.name,
          score: player.score,
          lines: player.lines,
          level: player.level,
          place: index + 1,
        }))}
      />

      <div className={styles.buttonContainer}>
        <Button onClick={handlePlayAgain} className={styles.playAgainButton}>
          Играть снова
        </Button>
      </div>
    </div>
  )
}

export default Results
