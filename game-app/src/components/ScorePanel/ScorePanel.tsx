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
      border: '1px dashed #ffffff',
    }}>
      <h4 style={{ margin: '0 0 5px 0', color: '#ffffff', textAlign: 'center' }}>{playerName}</h4>
      <div style={{ color: '#ffffff', fontSize: '14px' }}>
        <div style={{ marginBottom: '2px' }}>
          <strong>Счёт:</strong> {score}
        </div>
        <div style={{ marginBottom: '2px' }}>
          <strong>Уничтожено линий:</strong> {lines}
        </div>
        <div>
          <strong>Уровень:</strong> {level}
        </div>
      </div>
    </div>
  )
})

export default ScorePanel
