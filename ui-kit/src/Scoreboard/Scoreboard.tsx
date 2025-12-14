import React from 'react'

interface PlayerResult {
  name: string
  score: number
  lines: number
  level: number
  place: number
}

interface ScoreboardProps {
  players: PlayerResult[]
}

const Scoreboard = ({ players }: ScoreboardProps) => {
  return (
    <div style={{
      backgroundColor: '#40208bff',
    }}>
      <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse', textAlign: 'center', border: '2px solid #ffffff' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ffffff' }}>
            <th style={{ padding: '10px', border: '2px solid #ffffff' }}>Место</th>
            <th style={{ padding: '10px', border: '2px solid #ffffff' }}>Счёт</th>
            <th style={{ padding: '10px', border: '2px solid #ffffff' }}>Уничтожено линий</th>
            <th style={{ padding: '10px', border: '2px solid #ffffff' }}>Имя</th>
            <th style={{ padding: '10px', border: '2px solid #ffffff' }}>Уровень</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.place} style={{ borderBottom: '1px solid #ffffff' }}>
              <td style={{ padding: '20px', border: '1px solid #ffffff' }}>{player.place}</td>
              <td style={{ padding: '20px', border: '1px solid #ffffff' }}>{player.name}</td>
              <td style={{ padding: '20px', border: '1px solid #ffffff' }}>{player.score}</td>
              <td style={{ padding: '20px', border: '1px solid #ffffff' }}>{player.lines}</td>
              <td style={{ padding: '20px', border: '1px solid #ffffff' }}>{player.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard
