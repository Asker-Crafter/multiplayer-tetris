import React, { memo } from 'react'

import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
  title?: string
}

const Modal = memo(({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div>{children}</div>
        {onClose && (
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        )}
      </div>
    </div>
  )
})

export default Modal
