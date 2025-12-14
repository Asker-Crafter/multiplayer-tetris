import React, { memo } from 'react'

import styles from './Button.module.css'

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

const Button = memo(({ onClick, children, variant = 'primary', className }: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className || ''}`

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  )
})

export default Button
