import { getRandomTetromino, TETROMINOS } from './tetrominos'

describe('tetromino utilities', () => {
  it('getRandomTetromino should return a valid tetromino object', () => {
    const tetromino = getRandomTetromino()

    expect(tetromino).toHaveProperty('shape')
    expect(tetromino).toHaveProperty('color')

    expect(Array.isArray(tetromino.shape)).toBe(true)
    expect(Array.isArray(tetromino.shape[0])).toBe(true)
    
    expect(typeof tetromino.color).toBe('string')
    
    const allTetrominos = Object.values(TETROMINOS)

    expect(allTetrominos).toContain(tetromino)
  })
})