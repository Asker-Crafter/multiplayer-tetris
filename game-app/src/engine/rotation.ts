export const rotateTetromino = (shape: number[][]): number[][] => {
  const rows = shape.length
  const cols = shape[0].length
  const rotated: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0))

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      rotated[col][rows - 1 - row] = shape[row][col]
    }
  }

  return rotated
}
