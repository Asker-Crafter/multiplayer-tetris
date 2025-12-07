import { Button } from '@my-app/ui-kit'
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Lobby Page</h1>
      <p>Лобби для выбора количества игроков</p>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => navigate('/game')}>Начать игру</Button>
      </div>
    </div>
  )
}

export default Lobby
