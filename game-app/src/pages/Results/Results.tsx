import { Button } from '@my-app/ui-kit'
import { useNavigate } from 'react-router-dom'

const Results = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Results Page</h1>
      <p>Результаты игры</p>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => navigate('/lobby')} variant="secondary">
          Вернуться в лобби
        </Button>
        <Button onClick={() => navigate('/game')}>
          Начать новую игру
        </Button>
      </div>
    </div>
  )
}

export default Results
