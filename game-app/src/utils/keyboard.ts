export interface KeyMap {
  left: string
  right: string
  down: string
  rotate: string
  drop: string
  changeTarget: string
}

export const PLAYER_KEYMAPS: KeyMap[] = [
  {
    left: 'a',
    right: 'd',
    down: 's',
    rotate: 'w',
    drop: 'q',
    changeTarget: 'e',
  },
  {
    left: 'j',
    right: 'l',
    down: 'k',
    rotate: 'i',
    drop: 'u',
    changeTarget: 'o',
  },
  {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    down: 'ArrowDown',
    rotate: 'ArrowUp',
    drop: ' ',
    changeTarget: 'Enter',
  },
]

export const getPlayerForKey = (key: string): number | null => {
  for (let i = 0; i < PLAYER_KEYMAPS.length; i++) {
    const keymap = PLAYER_KEYMAPS[i]

    if (Object.values(keymap).includes(key)) {
      return i
    }
  }

  return null
}

export const getActionForKey = (playerId: number, key: string): string | null => {
  const keymap = PLAYER_KEYMAPS[playerId]

  if (!keymap) return null

  for (const [action, actionKey] of Object.entries(keymap)) {
    if (actionKey === key) {
      return action
    }
  }

  return null
}
