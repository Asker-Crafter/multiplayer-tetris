import { getNextTarget } from './targetSelection'

describe('getNextTarget', () => {
  it('selects next player in sequence', () => {
    expect(getNextTarget(0, 4, 2)).toBe(1)
  })

  it('wraps around to first player', () => {
    expect(getNextTarget(2, 3, 1)).toBe(0)
  })

  it('skips current player', () => {
    expect(getNextTarget(0, 3, 1)).toBe(2)
  })

  it('skips current player at wrap around', () => {
    expect(getNextTarget(1, 3, 2)).toBe(0)
  })

  it('handles two players', () => {
    expect(getNextTarget(0, 2, 1)).toBe(0)
  })

  it('cycles through all players except current', () => {
    const totalPlayers = 4
    const currentPlayer = 1
    let target = 0
    const visited = [target]

    for (let i = 0; i < totalPlayers - 2; i++) {
      target = getNextTarget(target, totalPlayers, currentPlayer)
      visited.push(target)
    }

    expect(visited).not.toContain(currentPlayer)
  })

  it('handles player 0 as current player', () => {
    expect(getNextTarget(1, 3, 0)).toBe(2)
  })

  it('handles last player as current player', () => {
    expect(getNextTarget(0, 4, 3)).toBe(1)
  })
})
