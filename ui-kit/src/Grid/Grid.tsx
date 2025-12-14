import React from 'react'

import styles from './Grid.module.css'

interface GridProps {
  children: React.ReactNode
  columns?: number
}

const Grid = ({ children, columns = 2 }: GridProps) => {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  )
}

export default Grid
