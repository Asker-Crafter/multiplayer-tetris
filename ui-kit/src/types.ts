export type Cell = number

export type GameBoard = Cell[][]

export interface Tetromino {
  shape: number[][]
  color: string
}
