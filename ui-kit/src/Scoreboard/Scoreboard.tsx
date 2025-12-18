import React from 'react'

import styles from './Scoreboard.module.css'

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
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Место</th>
            <th className={styles.headerCell}>Имя</th>
            <th className={styles.headerCell}>Счёт</th>
            <th className={styles.headerCell}>Уничтожено линий</th>
            <th className={styles.headerCell}>Уровень</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.place} className={styles.bodyRow}>
              <td className={styles.cell}>{player.place}</td>
              <td className={styles.cell}>{player.name}</td>
              <td className={styles.cell}>{player.score}</td>
              <td className={styles.cell}>{player.lines}</td>
              <td className={styles.cell}>{player.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard
