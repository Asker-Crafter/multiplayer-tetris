interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

const Button = ({ onClick, children, variant = 'primary' }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button button--${variant}`}>
      {children}
    </button>
  )
}

export default Button
