import { checkCollision } from './collision'

describe('checkCollision', () => {
  const emptyBoard = Array(20).fill(null).map(() => Array(10).fill(0))

  const shapeSquare = [
    [1, 1],
    [1, 1]
  ]

  const shapeLine = [[1, 1, 1, 1]]

  const shapeL = [
    [1, 0],
    [1, 0],
    [1, 1]
  ]

  it('returns false when piece is in valid position', () => {
    expect(checkCollision(emptyBoard, shapeSquare, 4, 0)).toBe(false)
  })

  it('returns true when piece goes beyond left boundary', () => {
    expect(checkCollision(emptyBoard, shapeSquare, -1, 0)).toBe(true)
  })

  it('returns true when piece goes beyond right boundary', () => {
    expect(checkCollision(emptyBoard, shapeSquare, 9, 0)).toBe(true)
  })

  it('returns true when piece goes beyond bottom boundary', () => {
    expect(checkCollision(emptyBoard, shapeSquare, 4, 19)).toBe(true)
  })

  it('returns false when piece is at bottom edge', () => {
    expect(checkCollision(emptyBoard, shapeSquare, 4, 18)).toBe(false)
  })

  it('returns false when piece is at left edge', () => {
    expect(checkCollision(emptyBoard, shapeSquare, 0, 0)).toBe(false)
  })

  it('returns false when piece is at right edge', () => {
    expect(checkCollision(emptyBoard, shapeSquare, 8, 0)).toBe(false)
  })

  it('returns true when piece collides with existing blocks', () => {
    const boardWithBlocks = emptyBoard.map((row, y) =>
      row.map((cell, x) => (y === 18 && x >= 4 && x < 6) ? 1 : 0)
    )

    expect(checkCollision(boardWithBlocks, shapeSquare, 4, 18)).toBe(true)
  })

  it('returns false when piece is above existing blocks', () => {
    const boardWithBlocks = emptyBoard.map((row, y) =>
      row.map((cell, x) => (y === 19 && x >= 4 && x < 6) ? 1 : 0)
    )

    expect(checkCollision(boardWithBlocks, shapeSquare, 4, 17)).toBe(false)
  })

  it('handles line piece at right boundary', () => {
    expect(checkCollision(emptyBoard, shapeLine, 7, 0)).toBe(true)
  })

  it('handles L-shaped piece', () => {
    expect(checkCollision(emptyBoard, shapeL, 0, 0)).toBe(false)
  })

  it('detects collision for L-shaped piece at boundary', () => {
    expect(checkCollision(emptyBoard, shapeL, 9, 0)).toBe(true)
  })

  it('handles negative Y position (spawning piece)', () => {
    expect(checkCollision(emptyBoard, shapeSquare, 4, -1)).toBe(false)
  })
})
