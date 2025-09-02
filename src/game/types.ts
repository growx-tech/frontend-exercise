export interface Card {
  id: string
  image: string
  matched: boolean
  revealed: boolean
}

export interface BoardConfig {
  rows: number
  cols: number
}
