import React, { memo } from 'react'

import { Modal } from '@my-app/ui-kit'

interface GameOverModalProps {
  isOpen: boolean
  playerName: string
}

const GameOverModal = memo(({ isOpen, playerName }: GameOverModalProps) => {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '20px' }}>Game Over!</h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          {playerName} has been eliminated
        </p>
      </div>
    </Modal>
  )
})

export default GameOverModal
