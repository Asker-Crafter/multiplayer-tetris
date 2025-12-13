import { clearLines, calculateScore, calculateLevel, calculateGarbageLines } from './scoring'

describe('clearLines', () => {
  it('clears no lines from empty board', () => {
    const emptyBoard = Array(20).fill(null).map(() => Array(10).fill(0))
    const result = clearLines(emptyBoard)

    expect(result.linesCleared).toBe(0)
    expect(result.newBoard.length).toBe(20)
  })

  it('clears one full line', () => {
    const board = Array(20).fill(null).map(() => Array(10).fill(0))

    board[19] = Array(10).fill(1)
    const result = clearLines(board)

    expect(result.linesCleared).toBe(1)
    expect(result.newBoard[19].every(cell => cell === 0)).toBe(true)
  })

  it('clears multiple full lines', () => {
    const board = Array(20).fill(null).map(() => Array(10).fill(0))

    board[19] = Array(10).fill(1)
    board[18] = Array(10).fill(1)
    board[17] = Array(10).fill(1)
    const result = clearLines(board)

    expect(result.linesCleared).toBe(3)
    expect(result.newBoard.length).toBe(20)
  })

  it('does not clear partially filled lines', () => {
    const board = Array(20).fill(null).map(() => Array(10).fill(0))

    board[19] = Array(10).fill(1)
    board[19][0] = 0
    const result = clearLines(board)

    expect(result.linesCleared).toBe(0)
  })

  it('preserves non-full lines above cleared lines', () => {
    const board = Array(20).fill(null).map(() => Array(10).fill(0))

    board[18][0] = 1
    board[19] = Array(10).fill(1)
    const result = clearLines(board)

    expect(result.linesCleared).toBe(1)
    expect(result.newBoard[19][0]).toBe(1)
  })

  it('handles tetris (4 lines)', () => {
    const board = Array(20).fill(null).map(() => Array(10).fill(0))

    board[19] = Array(10).fill(1)
    board[18] = Array(10).fill(1)
    board[17] = Array(10).fill(1)
    board[16] = Array(10).fill(1)
    const result = clearLines(board)

    expect(result.linesCleared).toBe(4)
  })
})

describe('calculateScore', () => {
  it('returns 0 for no lines cleared', () => {
    expect(calculateScore(0, 1)).toBe(0)
  })

  it('calculates score for single line', () => {
    expect(calculateScore(1, 1)).toBe(40)
  })

  it('calculates score for double lines', () => {
    expect(calculateScore(2, 1)).toBe(100)
  })

  it('calculates score for triple lines', () => {
    expect(calculateScore(3, 1)).toBe(300)
  })

  it('calculates score for tetris (4 lines)', () => {
    expect(calculateScore(4, 1)).toBe(1200)
  })

  it('multiplies score by level', () => {
    expect(calculateScore(4, 3)).toBe(3600)
  })

  it('handles higher levels', () => {
    expect(calculateScore(1, 10)).toBe(400)
  })
})

describe('calculateLevel', () => {
  it('returns level 1 for 0 lines', () => {
    expect(calculateLevel(0)).toBe(1)
  })

  it('returns level 1 for 9 lines', () => {
    expect(calculateLevel(9)).toBe(1)
  })

  it('returns level 2 for 10 lines', () => {
    expect(calculateLevel(10)).toBe(2)
  })

  it('returns level 3 for 20 lines', () => {
    expect(calculateLevel(20)).toBe(3)
  })

  it('returns level 5 for 45 lines', () => {
    expect(calculateLevel(45)).toBe(5)
  })

  it('handles 100+ lines', () => {
    expect(calculateLevel(100)).toBe(11)
  })
})

describe('calculateGarbageLines', () => {
  it('returns 0 for 0 lines cleared', () => {
    expect(calculateGarbageLines(0)).toBe(0)
  })

  it('returns 0 for single line', () => {
    expect(calculateGarbageLines(1)).toBe(0)
  })

  it('returns 1 for double lines', () => {
    expect(calculateGarbageLines(2)).toBe(1)
  })

  it('returns 2 for triple lines', () => {
    expect(calculateGarbageLines(3)).toBe(2)
  })

  it('returns 4 for tetris (4 lines)', () => {
    expect(calculateGarbageLines(4)).toBe(4)
  })

  it('returns 0 for 5 lines', () => {
    expect(calculateGarbageLines(5)).toBe(0)
  })
})
