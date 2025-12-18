import { Button } from '@my-app/ui-kit'
import { useNavigate } from 'react-router-dom'

const GameRoom = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Game Room Page</h1>
      <p>Игровая комната</p>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => navigate('/lobby')} variant="secondary">
          Вернуться в лобби
        </Button>
        <Button onClick={() => navigate('/results')}>
          Результаты
        </Button>
      </div>
    </div>
  )
}

export default GameRoom
