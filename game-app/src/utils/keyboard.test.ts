import { getPlayerForKey, getActionForKey, PLAYER_KEYMAPS } from './keyboard'

describe('getPlayerForKey', () => {
  it('returns 0 for player 1 WASD keys', () => {
    expect(getPlayerForKey('KeyA')).toBe(0)
    expect(getPlayerForKey('KeyD')).toBe(0)
    expect(getPlayerForKey('KeyS')).toBe(0)
    expect(getPlayerForKey('KeyW')).toBe(0)
  })

  it('returns 0 for player 1 q key', () => {
    expect(getPlayerForKey('KeyQ')).toBe(0)
  })

  it('returns 0 for player 1 e key', () => {
    expect(getPlayerForKey('KeyE')).toBe(0)
  })

  it('returns 1 for player 2 IJKL keys', () => {
    expect(getPlayerForKey('KeyJ')).toBe(1)
    expect(getPlayerForKey('KeyL')).toBe(1)
    expect(getPlayerForKey('KeyK')).toBe(1)
    expect(getPlayerForKey('KeyI')).toBe(1)
  })

  it('returns 1 for player 2 u and o keys', () => {
    expect(getPlayerForKey('KeyU')).toBe(1)
    expect(getPlayerForKey('KeyO')).toBe(1)
  })

  it('returns 2 for player 3 arrow keys', () => {
    expect(getPlayerForKey('ArrowLeft')).toBe(2)
    expect(getPlayerForKey('ArrowRight')).toBe(2)
    expect(getPlayerForKey('ArrowDown')).toBe(2)
    expect(getPlayerForKey('ArrowUp')).toBe(2)
  })

  it('returns 2 for player 3 space and enter keys', () => {
    expect(getPlayerForKey('Space')).toBe(2)
    expect(getPlayerForKey('Enter')).toBe(2)
  })

  it('returns null for unmapped keys', () => {
    expect(getPlayerForKey('z')).toBe(null)
    expect(getPlayerForKey('1')).toBe(null)
    expect(getPlayerForKey('Escape')).toBe(null)
  })
})

describe('getActionForKey', () => {
  it('returns correct action for player 0 keys', () => {
    expect(getActionForKey(0, 'KeyA')).toBe('left')
    expect(getActionForKey(0, 'KeyD')).toBe('right')
    expect(getActionForKey(0, 'KeyS')).toBe('down')
    expect(getActionForKey(0, 'KeyW')).toBe('rotate')
    expect(getActionForKey(0, 'KeyQ')).toBe('drop')
    expect(getActionForKey(0, 'KeyE')).toBe('changeTarget')
  })

  it('returns correct action for player 1 keys', () => {
    expect(getActionForKey(1, 'KeyJ')).toBe('left')
    expect(getActionForKey(1, 'KeyL')).toBe('right')
    expect(getActionForKey(1, 'KeyK')).toBe('down')
    expect(getActionForKey(1, 'KeyI')).toBe('rotate')
    expect(getActionForKey(1, 'KeyU')).toBe('drop')
    expect(getActionForKey(1, 'KeyO')).toBe('changeTarget')
  })

  it('returns correct action for player 2 keys', () => {
    expect(getActionForKey(2, 'ArrowLeft')).toBe('left')
    expect(getActionForKey(2, 'ArrowRight')).toBe('right')
    expect(getActionForKey(2, 'ArrowDown')).toBe('down')
    expect(getActionForKey(2, 'ArrowUp')).toBe('rotate')
    expect(getActionForKey(2, 'Space')).toBe('drop')
    expect(getActionForKey(2, 'Enter')).toBe('changeTarget')
  })

  it('returns null for wrong key on player', () => {
    expect(getActionForKey(0, 'KeyJ')).toBe(null)
    expect(getActionForKey(1, 'KeyA')).toBe(null)
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
