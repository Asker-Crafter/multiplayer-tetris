import React, { memo } from 'react'

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  style?: React.CSSProperties
}

const Button = memo(({ onClick, children, variant = 'primary', style }: ButtonProps) => {
  const baseStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
    fontFamily: 'Comic Sans MS',
    ...style,
  }

  const variantStyle: React.CSSProperties = variant === 'primary'
    ? {
      backgroundColor: '#fe8605ff',
      color: '#fff',
    }
    : {
      backgroundColor: '#ffedc1ff',
      color: '#ffffffff',
    }

  return (
    <button onClick={onClick} style={{ ...baseStyle, ...variantStyle }}>
      {children}
    </button>
  )
})

export default Button
