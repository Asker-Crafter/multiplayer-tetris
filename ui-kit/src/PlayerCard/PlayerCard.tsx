interface PlayerCardProps {
  name: string
  score: number
  status: 'active' | 'game-over'
}

const PlayerCard = ({ name, score, status }: PlayerCardProps) => {
  return (
    <div className={`player-card player-card--${status}`}>
      <h3 className="player-card__name">{name}</h3>
      <p className="player-card__score">Score: {score}</p>
      <span className="player-card__status">{status}</span>
    </div>
  )
}

export default PlayerCard
