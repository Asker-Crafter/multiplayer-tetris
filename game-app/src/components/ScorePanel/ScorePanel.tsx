import React, { memo } from 'react'

interface ScorePanelProps {
  score: number
  lines: number
  level: number
  playerName: string
}

const ScorePanel = memo(({ score, lines, level, playerName }: ScorePanelProps) => {
  return (
    <div style={{
      padding: '10px',
      backgroundColor: '#000c5bff',
      border: '5px dashed #ffffffff',
      borderRadius: '7px',
    }}>
      <h3 style={{ margin: '0 0 5px 0', color: '#00d9ffff' }}>{playerName}</h3>
      <div style={{ color: '#fff', fontSize: '15px' }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>Score:</strong> {score}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>Lines:</strong> {lines}
        </div>
        <div>
          <strong>Level:</strong> {level}
        </div>
      </div>
    </div>
  )
})

export default ScorePanel
