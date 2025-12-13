import { getPlayerForKey, getActionForKey, PLAYER_KEYMAPS } from './keyboard'

describe('getPlayerForKey', () => {
  it('returns 0 for player 1 arrow keys', () => {
    expect(getPlayerForKey('ArrowLeft')).toBe(0)
    expect(getPlayerForKey('ArrowRight')).toBe(0)
    expect(getPlayerForKey('ArrowDown')).toBe(0)
    expect(getPlayerForKey('ArrowUp')).toBe(0)
  })

  it('returns 0 for player 1 space key', () => {
    expect(getPlayerForKey(' ')).toBe(0)
  })

  it('returns 0 for player 1 enter key', () => {
    expect(getPlayerForKey('Enter')).toBe(0)
  })

  it('returns 1 for player 2 WASD keys', () => {
    expect(getPlayerForKey('a')).toBe(1)
    expect(getPlayerForKey('d')).toBe(1)
    expect(getPlayerForKey('s')).toBe(1)
    expect(getPlayerForKey('w')).toBe(1)
  })

  it('returns 1 for player 2 q and e keys', () => {
    expect(getPlayerForKey('q')).toBe(1)
    expect(getPlayerForKey('e')).toBe(1)
  })

  it('returns 2 for player 3 IJKL keys', () => {
    expect(getPlayerForKey('j')).toBe(2)
    expect(getPlayerForKey('l')).toBe(2)
    expect(getPlayerForKey('k')).toBe(2)
    expect(getPlayerForKey('i')).toBe(2)
  })

  it('returns 2 for player 3 u and o keys', () => {
    expect(getPlayerForKey('u')).toBe(2)
    expect(getPlayerForKey('o')).toBe(2)
  })

  it('returns null for unmapped keys', () => {
    expect(getPlayerForKey('z')).toBe(null)
    expect(getPlayerForKey('1')).toBe(null)
    expect(getPlayerForKey('Escape')).toBe(null)
  })
})

describe('getActionForKey', () => {
  it('returns correct action for player 0 keys', () => {
    expect(getActionForKey(0, 'ArrowLeft')).toBe('left')
    expect(getActionForKey(0, 'ArrowRight')).toBe('right')
    expect(getActionForKey(0, 'ArrowDown')).toBe('down')
    expect(getActionForKey(0, 'ArrowUp')).toBe('rotate')
    expect(getActionForKey(0, ' ')).toBe('drop')
    expect(getActionForKey(0, 'Enter')).toBe('changeTarget')
  })

  it('returns correct action for player 1 keys', () => {
    expect(getActionForKey(1, 'a')).toBe('left')
    expect(getActionForKey(1, 'd')).toBe('right')
    expect(getActionForKey(1, 's')).toBe('down')
    expect(getActionForKey(1, 'w')).toBe('rotate')
    expect(getActionForKey(1, 'q')).toBe('drop')
    expect(getActionForKey(1, 'e')).toBe('changeTarget')
  })

  it('returns correct action for player 2 keys', () => {
    expect(getActionForKey(2, 'j')).toBe('left')
    expect(getActionForKey(2, 'l')).toBe('right')
    expect(getActionForKey(2, 'k')).toBe('down')
    expect(getActionForKey(2, 'i')).toBe('rotate')
    expect(getActionForKey(2, 'u')).toBe('drop')
    expect(getActionForKey(2, 'o')).toBe('changeTarget')
  })

  it('returns null for wrong key on player', () => {
    expect(getActionForKey(0, 'a')).toBe(null)
    expect(getActionForKey(1, 'ArrowLeft')).toBe(null)
  })

  it('returns null for invalid player id', () => {
    expect(getActionForKey(3, 'a')).toBe(null)
    expect(getActionForKey(-1, 'ArrowLeft')).toBe(null)
  })

  it('returns null for unmapped keys', () => {
    expect(getActionForKey(0, 'z')).toBe(null)
  })
})

describe('PLAYER_KEYMAPS', () => {
  it('has keymaps for 3 players', () => {
    expect(PLAYER_KEYMAPS.length).toBe(3)
  })

  it('each keymap has all required actions', () => {
    const requiredActions = ['left', 'right', 'down', 'rotate', 'drop', 'changeTarget']

    PLAYER_KEYMAPS.forEach(keymap => {
      requiredActions.forEach(action => {
        expect(keymap).toHaveProperty(action)
      })
    })
  })

  it('no duplicate keys within a keymap', () => {
    PLAYER_KEYMAPS.forEach(keymap => {
      const keys = Object.values(keymap)
      const uniqueKeys = new Set(keys)

      expect(keys.length).toBe(uniqueKeys.size)
    })
  })
})
