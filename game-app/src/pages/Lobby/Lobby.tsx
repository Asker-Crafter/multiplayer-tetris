import { useState, useContext } from 'react'

import { Button } from '@my-app/ui-kit'
import { useNavigate } from 'react-router-dom'

import styles from './Lobby.module.css'
import { GameContext } from '../../context/GameContext'
import { PlayersContext } from '../../context/PlayersContext'

const Lobby = () => {
  const navigate = useNavigate()
  const playersContext = useContext(PlayersContext)
  const gameContext = useContext(GameContext)
  const [names, setNames] = useState<string[]>(['Неопознанный 1', 'Неопазнанный 2', 'Неопознанный 3'])

  if (!playersContext || !gameContext) {
    return <div>Загрузка...</div>
  }

  const handleStartGame = () => {
    const playerNames = Array.from({ length: playersContext.playerCount }, (_, i) =>
      names[i] || `Игрок ${i + 1}`
    )

    // Передаём имена в startGame, который сам инициализирует игроков
    gameContext.startGame(playerNames)
    navigate('/game')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>МУЛЬТИПЛЕЕРНЫЙ ТЕТРИС</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Выберите количество игроков:</h2>
        <div className={styles.buttonGroup}>
          {[1, 2, 3].map(count => (
            <Button
              key={count}
              onClick={() => playersContext.setPlayerCount(count)}
              variant={playersContext.playerCount === count ? 'primary' : 'secondary'}
              className={styles.playerCountButton}
            >
              {count} игрок{count > 1 ? 'а' : ''}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.playerNamesSection}>
        <h2 className={styles.sectionTitle}>Введите имена игроков:</h2>
        {Array.from({ length: playersContext.playerCount }).map((_, i) => (
          <div key={i} className={styles.inputWrapper}>
            <input
              type="text"
              value={names[i]}
              onChange={(e) => {
                const newNames = [...names]

                newNames[i] = e.target.value
                setNames(newNames)
              }}
              placeholder={`Неопознанный ${i + 1}`}
              className={styles.nameInput}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleStartGame} className={styles.startButton}>
        Начать игру
      </Button>
    </div>
  )
}

export default Lobby
