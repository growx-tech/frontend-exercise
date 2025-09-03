import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Tile {
  id: number
  imageUrl: string
  isFlipped: boolean
  isMatched: boolean
}

export type BoardSize = '2x2' | '4x4' | '6x6' | '4x5'

interface GameState {
  playerName: string
  tiles: Tile[]
  flippedTiles: number[]
  matchedPairs: number
  totalPairs: number
  gameStartTime: number | null
  gameEndTime: number | null
  boardSize: BoardSize
  isGameActive: boolean
}

type GameAction =
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'SET_BOARD_SIZE'; payload: BoardSize }
  | { type: 'INITIALIZE_GAME'; payload: { tiles: Tile[]; totalPairs: number } }
  | { type: 'FLIP_TILE'; payload: number }
  | { type: 'SET_MATCHED'; payload: number[] }
  | { type: 'RESET_FLIPPED' }
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  playerName: '',
  tiles: [],
  flippedTiles: [],
  matchedPairs: 0,
  totalPairs: 0,
  gameStartTime: null,
  gameEndTime: null,
  boardSize: '4x4',
  isGameActive: false
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload }
    case 'SET_BOARD_SIZE':
      return { ...state, boardSize: action.payload }
    case 'INITIALIZE_GAME':
      return {
        ...state,
        tiles: action.payload.tiles,
        totalPairs: action.payload.totalPairs,
        flippedTiles: [],
        matchedPairs: 0,
        gameStartTime: null,
        gameEndTime: null,
        isGameActive: false
      }
    case 'FLIP_TILE':
      return {
        ...state,
        tiles: state.tiles.map(tile =>
          tile.id === action.payload ? { ...tile, isFlipped: true } : tile
        ),
        flippedTiles: [...state.flippedTiles, action.payload]
      }
    case 'SET_MATCHED':
      return {
        ...state,
        tiles: state.tiles.map(tile =>
          action.payload.includes(tile.id) ? { ...tile, isMatched: true } : tile
        ),
        matchedPairs: state.matchedPairs + 1,
        flippedTiles: []
      }
    case 'RESET_FLIPPED':
      return {
        ...state,
        tiles: state.tiles.map(tile =>
          state.flippedTiles.includes(tile.id) && !tile.isMatched
            ? { ...tile, isFlipped: false }
            : tile
        ),
        flippedTiles: []
      }
    case 'START_GAME':
      return {
        ...state,
        gameStartTime: Date.now(),
        isGameActive: true
      }
    case 'END_GAME':
      return {
        ...state,
        gameEndTime: Date.now(),
        isGameActive: false
      }
    case 'RESET_GAME':
      return { ...initialState, playerName: state.playerName, boardSize: state.boardSize }
    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
