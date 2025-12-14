import React, { memo } from 'react'

import styles from './ScorePanel.module.css'

interface ScorePanelProps {
  score: number
  lines: number
  level: number
  playerName: string
}

const ScorePanel = memo(({ score, lines, level, playerName }: ScorePanelProps) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.playerName}>{playerName}</h4>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>Счёт:</strong> {score}
        </div>
        <div className={styles.stat}>
          <strong>Уничтожено линий:</strong> {lines}
        </div>
        <div className={styles.stat}>
          <strong>Уровень:</strong> {level}
        </div>
      </div>
    </div>
  )
})

export default ScorePanel
