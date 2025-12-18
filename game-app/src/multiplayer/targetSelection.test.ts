import { getNextTarget, canChangeTarget } from './targetSelection'

import type { Player } from '../context/PlayersContext'

const createPlayers = (count: number, aliveStates?: boolean[]): Player[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Player ${i + 1}`,
    isAlive: aliveStates ? aliveStates[i] : true,
    score: 0,
    lines: 0,
    level: 1,
    attackQueue: 0,
    attackTarget: (i + 1) % count,
  }))
}

describe('getNextTarget', () => {
  it('selects next player in sequence', () => {
    const players = createPlayers(4)

    expect(getNextTarget(0, players, 2)).toBe(1)
  })

  it('wraps around to first player', () => {
    const players = createPlayers(3)

    expect(getNextTarget(2, players, 1)).toBe(0)
  })

  it('skips current player', () => {
    const players = createPlayers(3)

    expect(getNextTarget(0, players, 1)).toBe(2)
  })

  it('skips current player at wrap around', () => {
    const players = createPlayers(3)

    expect(getNextTarget(1, players, 2)).toBe(0)
  })

  it('handles two players', () => {
    const players = createPlayers(2)

    expect(getNextTarget(0, players, 1)).toBe(0)
  })

  it('cycles through all players except current', () => {
    const players = createPlayers(4)
    const currentPlayer = 1
    let target = 0
    const visited = [target]

    for (let i = 0; i < players.length - 2; i++) {
      target = getNextTarget(target, players, currentPlayer)
      visited.push(target)
    }

    expect(visited).not.toContain(currentPlayer)
  })

  it('handles player 0 as current player', () => {
    const players = createPlayers(3)

    expect(getNextTarget(1, players, 0)).toBe(2)
  })

  it('handles last player as current player', () => {
    const players = createPlayers(4)

    expect(getNextTarget(0, players, 3)).toBe(1)
  })

  describe('with isAlive check', () => {
    it('skips dead players and selects next alive player', () => {
      const players = createPlayers(3, [true, false, true])

      expect(getNextTarget(0, players, 2)).toBe(0)
    })

    it('wraps around skipping dead players', () => {
      const players = createPlayers(4, [true, false, false, true])

      expect(getNextTarget(3, players, 0)).toBe(3)
    })

    it('returns current target if no alive opponents', () => {
      const players = createPlayers(3, [true, false, false])

      expect(getNextTarget(1, players, 0)).toBe(1)
    })

    it('handles single alive opponent correctly', () => {
      const players = createPlayers(3, [true, true, false])

      expect(getNextTarget(0, players, 0)).toBe(1)
      expect(getNextTarget(1, players, 0)).toBe(1)
    })

    it('skips multiple dead players in a row', () => {
      const players = createPlayers(5, [true, false, false, false, true])

      expect(getNextTarget(0, players, 0)).toBe(4)
    })

    it('returns only alive opponent when one alive opponent exists', () => {
      const players = createPlayers(4, [true, true, false, false])

      expect(getNextTarget(0, players, 0)).toBe(1)
      expect(getNextTarget(1, players, 0)).toBe(1)
    })

    it('handles all opponents dead', () => {
      const players = createPlayers(3, [true, false, false])

      expect(getNextTarget(0, players, 0)).toBe(0)
    })
  })
})

describe('canChangeTarget', () => {
  it('returns true when multiple alive opponents exist', () => {
    const players = createPlayers(3, [true, true, true])

    expect(canChangeTarget(players, 0)).toBe(true)
  })

  it('returns false when only one alive opponent', () => {
    const players = createPlayers(3, [true, true, false])

    expect(canChangeTarget(players, 0)).toBe(false)
  })

  it('returns false when no alive opponents', () => {
    const players = createPlayers(3, [true, false, false])

    expect(canChangeTarget(players, 0)).toBe(false)
  })

  it('returns true for 4 players with 2 alive opponents', () => {
    const players = createPlayers(4, [true, true, false, true])

    expect(canChangeTarget(players, 0)).toBe(true)
  })

  it('returns false for 2 players with 1 alive opponent', () => {
    const players = createPlayers(2, [true, true])

    expect(canChangeTarget(players, 0)).toBe(false)
  })

  it('counts only alive opponents', () => {
    const players = createPlayers(5, [true, true, false, true, false])

    expect(canChangeTarget(players, 0)).toBe(true)
  })
})
