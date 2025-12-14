import React, { memo } from 'react'

import styles from './AttackQueue.module.css'

interface AttackQueueProps {
  count: number
}

const AttackQueue = memo(({ count }: AttackQueueProps) => {
  if (count === 0) return null

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Incoming Attack!</h4>
      <div className={styles.count}>
        {count} garbage line{count > 1 ? 's' : ''}
      </div>
    </div>
  )
})

export default AttackQueue
