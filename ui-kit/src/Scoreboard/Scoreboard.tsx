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
      backgroundColor: '#1a1a1a',
      border: '2px solid #333',
      borderRadius: '8px',
      padding: '20px',
    }}>
      <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Place</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Score</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Lines</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Level</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.place} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '10px' }}>{player.place}</td>
              <td style={{ padding: '10px' }}>{player.name}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{player.score}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{player.lines}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>{player.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard
