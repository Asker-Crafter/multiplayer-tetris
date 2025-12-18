interface GridProps {
  children: React.ReactNode
  columns?: number
}

const Grid = ({ children, columns = 2 }: GridProps) => {
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  )
}

export default Grid
