import { useState, useContext } from 'react'

import { Button } from '@my-app/ui-kit'
import { useNavigate } from 'react-router-dom'

import { GameContext } from '../../context/GameContext'
import { PlayersContext } from '../../context/PlayersContext'

const Lobby = () => {
  const navigate = useNavigate()
  const playersContext = useContext(PlayersContext)
  const gameContext = useContext(GameContext)
  const [names, setNames] = useState<string[]>(['Неопознанный 1', 'Неопазнанный 2', 'Неопознанный 3'])

  if (!playersContext || !gameContext) {
    return <div>Loading...</div>
  }

  const handleStartGame = () => {
    const playerNames = Array.from({ length: playersContext.playerCount }, (_, i) =>
      names[i] || `Player ${i + 1}`
    )

    // Передаём имена в startGame, который сам инициализирует игроков
    gameContext.startGame(playerNames)
    navigate('/game')
  }

  return (
    <div style={{ padding: '10px', maxWidth: '800px', margin: '0 auto', fontSize: '14px' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '28px' }}>МУЛЬТИПЛЕЕРНЫЙ ТЕТРИС</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>Выберите количество игроков:</h2>
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
          {[1, 2, 3].map(count => (
            <Button
              key={count}
              onClick={() => playersContext.setPlayerCount(count)}
              variant={playersContext.playerCount === count ? 'primary' : 'secondary'}
              style={{ fontSize: '26px' }}
            >
              {count} игрок{count > 1 ? 'а' : ''}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '10px', textAlign: 'center',  }}>Введите имена игроков:</h2>
        {Array.from({ length: playersContext.playerCount }).map((_, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={names[i]}
              onChange={(e) => {
                const newNames = [...names]

                newNames[i] = e.target.value
                setNames(newNames)
              }}
              placeholder={`Неопознанный ${i + 1}`}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '20px',
                border: '3px dashed #051768',
                borderRadius: '4px',
                fontFamily: 'Comic Sans MS',
                color: '#051768',
                textAlign: 'center'
              }}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleStartGame} style={{ width: '100%', padding: '15px', fontSize: '40px' }}>
        Начать игру
      </Button>
    </div>
  )
}

export default Lobby
