import { useContext } from 'react'

import { Button, Scoreboard } from '@my-app/ui-kit'
import { useNavigate } from 'react-router-dom'

import { GameContext } from '../../context/GameContext'
import { PlayersContext } from '../../context/PlayersContext'

const Results = () => {
  const navigate = useNavigate()
  const playersContext = useContext(PlayersContext)
  const gameContext = useContext(GameContext)

  if (!playersContext || !gameContext) {
    return <div>Loading...</div>
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
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Game Results</h1>

      {sortedPlayers.length > 0 && sortedPlayers[0].isAlive && (
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#22c55e',
          borderRadius: '8px',
        }}>
          <h2 style={{ margin: 0, color: '#fff' }}>Winner: {sortedPlayers[0].name}</h2>
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

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <Button onClick={handlePlayAgain} style={{ padding: '15px 30px', fontSize: '18px' }}>
          Play Again
        </Button>
      </div>
    </div>
  )
}

export default Results
