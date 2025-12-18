import React, { memo, useState, useEffect } from 'react'

import { Modal } from '@my-app/ui-kit'

import styles from './GameOverModal.module.css'

interface GameOverModalProps {
  isOpen: boolean
  playerNames: string[]
  onClose?: () => void
  autoCloseDuration?: number
}

const GameOverModal = memo(({
  isOpen,
  playerNames,
  onClose,
  autoCloseDuration = 3000
}: GameOverModalProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)

      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, autoCloseDuration)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoCloseDuration, onClose])

  if (!isVisible) return null

  const getMessage = () => {
    if (playerNames.length === 0) return ''

    if (playerNames.length === 1) {
      return `${playerNames[0]} был выбит из игры`
    }

    if (playerNames.length === 2) {
      return `Выбыли ${playerNames[0]} и ${playerNames[1]}`
    }
    const lastPlayer = playerNames[playerNames.length - 1]
    const otherPlayers = playerNames.slice(0, -1).join(', ')

    return `Выбыли ${otherPlayers} и ${lastPlayer}`
  }

  return (
    <Modal isOpen={isVisible}>
      <div className={styles.container}>
        <h2 className={styles.title}>Игра окончена!</h2>
        <p className={styles.message}>
          {getMessage()}
        </p>
      </div>
    </Modal>
  )
})

export default GameOverModal
