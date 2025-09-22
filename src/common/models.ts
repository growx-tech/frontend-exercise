export type shuffleCardModel = {
  id: number
  number: number
}

export type UserState = {
  name: string
  email: string
}

export type GameState = {
  won: boolean
  enableMove: boolean
  cards: shuffleCardModel[]
  gridSize: number
  page: Pages
  result: userResult[]
}

export type userResult = {
  gameWin: number
  gameLoss: number
  gridSize: number
  time: string
  won: boolean
  loss: boolean
}

export enum Pages {
  StartGame = 0,
  PlayGame = 1,
  EndGame = 2
}
