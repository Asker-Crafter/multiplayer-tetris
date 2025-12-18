import type { Player } from '../context/PlayersContext'

export const getNextTarget = (
  currentTarget: number,
  players: Player[],
  currentPlayerId: number
): number => {
  // Находим всех живых противников (не включая текущего игрока)
  const aliveOpponents = players.filter(p => p.id !== currentPlayerId && p.isAlive)

  // Если нет живых противников, возвращаем текущую цель
  if (aliveOpponents.length === 0) {
    return currentTarget
  }

  // Если только один живой противник, возвращаем его
  if (aliveOpponents.length === 1) {
    return aliveOpponents[0].id
  }

  // Ищем следующую живую цель после текущей
  let nextTarget = (currentTarget + 1) % players.length
  let attempts = 0

  while (attempts < players.length) {
    // Пропускаем текущего игрока
    if (nextTarget === currentPlayerId) {
      nextTarget = (nextTarget + 1) % players.length
      attempts++
      continue
    }

    // Проверяем, жив ли этот игрок
    const targetPlayer = players.find(p => p.id === nextTarget)

    if (targetPlayer && targetPlayer.isAlive) {
      return nextTarget
    }

    nextTarget = (nextTarget + 1) % players.length
    attempts++
  }

  // Если не нашли живого, возвращаем текущую цель
  return currentTarget
}

// Новая функция для проверки возможности смены цели
export const canChangeTarget = (players: Player[], currentPlayerId: number): boolean => {
  const aliveOpponents = players.filter(p => p.id !== currentPlayerId && p.isAlive)

  return aliveOpponents.length > 1
}
