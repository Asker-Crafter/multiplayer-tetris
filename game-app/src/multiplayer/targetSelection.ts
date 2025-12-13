export const getNextTarget = (currentTarget: number, totalPlayers: number, currentPlayer: number): number => {
  let nextTarget = (currentTarget + 1) % totalPlayers

  while (nextTarget === currentPlayer) {
    nextTarget = (nextTarget + 1) % totalPlayers
  }

  return nextTarget
}
