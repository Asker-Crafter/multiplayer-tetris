import React, { memo } from 'react'

interface AttackQueueProps {
  count: number
}

const AttackQueue = memo(({ count }: AttackQueueProps) => {
  if (count === 0) return null

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#dc2626',
      border: '2px solid #991b1b',
      borderRadius: '8px',
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>Incoming Attack!</h4>
      <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
        {count} garbage line{count > 1 ? 's' : ''}
      </div>
    </div>
  )
})

export default AttackQueue
