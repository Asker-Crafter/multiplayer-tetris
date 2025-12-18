import { rotateTetromino } from './rotation'

describe('rotateTetromino', () => {
  it('rotates a 2x2 square (no visual change)', () => {
    const square = [
      [1, 1],
      [1, 1]
    ]
    const rotated = rotateTetromino(square)

    expect(rotated).toEqual([
      [1, 1],
      [1, 1]
    ])
  })

  it('rotates a line from horizontal to vertical', () => {
    const lineH = [[1, 1, 1, 1]]
    const rotated = rotateTetromino(lineH)

    expect(rotated).toEqual([
      [1],
      [1],
      [1],
      [1]
    ])
  })

  it('rotates a line from vertical to horizontal', () => {
    const lineV = [[1], [1], [1], [1]]
    const rotated = rotateTetromino(lineV)

    expect(rotated).toEqual([[1, 1, 1, 1]])
  })

  it('rotates L-shape clockwise', () => {
    const lShape = [
      [1, 0],
      [1, 0],
      [1, 1]
    ]
    const rotated = rotateTetromino(lShape)

    expect(rotated).toEqual([
      [1, 1, 1],
      [1, 0, 0]
    ])
  })

  it('rotates T-shape', () => {
    const tShape = [
      [1, 1, 1],
      [0, 1, 0]
    ]
    const rotated = rotateTetromino(tShape)

    expect(rotated).toEqual([
      [0, 1],
      [1, 1],
      [0, 1]
    ])
  })

  it('rotates S-shape', () => {
    const sShape = [
      [0, 1, 1],
      [1, 1, 0]
    ]
    const rotated = rotateTetromino(sShape)

    expect(rotated).toEqual([
      [1, 0],
      [1, 1],
      [0, 1]
    ])
  })

  it('rotates Z-shape', () => {
    const zShape = [
      [1, 1, 0],
      [0, 1, 1]
    ]
    const rotated = rotateTetromino(zShape)

    expect(rotated).toEqual([
      [0, 1],
      [1, 1],
      [1, 0]
    ])
  })

  it('handles single cell', () => {
    const single = [[1]]
    const rotated = rotateTetromino(single)

    expect(rotated).toEqual([[1]])
  })
})
