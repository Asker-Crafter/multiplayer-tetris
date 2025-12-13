import { addGarbageLines, cancelAttack } from './attackSystem'

describe('addGarbageLines', () => {
  const emptyBoard = Array(20).fill(null).map(() => Array(10).fill(0))

  it('adds one garbage line to board', () => {
    const result = addGarbageLines(emptyBoard, 1)

    expect(result.length).toBe(20)
    const lastLine = result[19]
    const holeCount = lastLine.filter(cell => cell === 0).length

    expect(holeCount).toBe(1)
  })

  it('adds multiple garbage lines', () => {
    const result = addGarbageLines(emptyBoard, 3)

    expect(result.length).toBe(20)

    for (let i = 17; i < 20; i++) {
      const holeCount = result[i].filter(cell => cell === 0).length

      expect(holeCount).toBe(1)
    }
  })

  it('removes top lines when adding garbage', () => {
    const result = addGarbageLines(emptyBoard, 2)

    expect(result.length).toBe(20)
  })

  it('each garbage line has exactly one hole', () => {
    const result = addGarbageLines(emptyBoard, 4)

    for (let i = 16; i < 20; i++) {
      const holeCount = result[i].filter(cell => cell === 0).length

      expect(holeCount).toBe(1)
      const filledCount = result[i].filter(cell => cell === 8).length

      expect(filledCount).toBe(9)
    }
  })

  it('preserves existing board content above garbage', () => {
    const boardWithPieces = emptyBoard.map((row, y) =>
      row.map(() => (y >= 18 ? 1 : 0))
    )
    const result = addGarbageLines(boardWithPieces, 1)

    expect(result.length).toBe(20)
  })

  it('handles zero garbage lines', () => {
    const result = addGarbageLines(emptyBoard, 0)

    expect(result.length).toBe(20)
    expect(result).toEqual(emptyBoard)
  })
})

describe('cancelAttack', () => {
  it('fully cancels attack when lines equal attack queue', () => {
    const result = cancelAttack(2, 2)

    expect(result.remainingAttack).toBe(0)
    expect(result.garbageToAdd).toBe(0)
  })

  it('partially cancels attack when lines less than attack queue', () => {
    const result = cancelAttack(4, 2)

    expect(result.remainingAttack).toBe(2)
    expect(result.garbageToAdd).toBe(0)
  })

  it('fully cancels attack when lines more than attack queue', () => {
    const result = cancelAttack(2, 4)

    expect(result.remainingAttack).toBe(0)
    expect(result.garbageToAdd).toBe(0)
  })

  it('handles zero attack queue', () => {
    const result = cancelAttack(0, 3)

    expect(result.remainingAttack).toBe(0)
    expect(result.garbageToAdd).toBe(0)
  })

  it('handles zero lines cleared', () => {
    const result = cancelAttack(3, 0)

    expect(result.remainingAttack).toBe(3)
    expect(result.garbageToAdd).toBe(0)
  })

  it('cancels single line attack', () => {
    const result = cancelAttack(1, 1)

    expect(result.remainingAttack).toBe(0)
    expect(result.garbageToAdd).toBe(0)
  })
})
