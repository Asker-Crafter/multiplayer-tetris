interface ScoreEntry {
  name: string
  score: number
  place: number
}

interface ScoreboardProps {
  entries: ScoreEntry[]
}

const Scoreboard = ({ entries }: ScoreboardProps) => {
  return (
    <div className="scoreboard">
      <h2 className="scoreboard__title">Scoreboard</h2>
      <table className="scoreboard__table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.place}>
              <td>{entry.place}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard
