import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState, Pages, shuffleCardModel } from '../common/models'

const initialState: GameState = {
    cards: [],
    won:false,
    enableMove: false,
    gridSize: 4,
    page: Pages.StartGame
}

const gameStatSlice = createSlice({
    name:'game',
    initialState,
    reducers:{
        setWon: (state, action: PayloadAction<boolean>) => {
      state.won = action.payload
    },
        setEnableMove :(state, action: PayloadAction<boolean>)=>{
        state.enableMove = action.payload
    },
     setCards: (state, action: PayloadAction<shuffleCardModel[]>) => {
      state.cards = action.payload
    },
    setGridSize :(state, action: PayloadAction<number>)=>{
        state.gridSize = action.payload
    },
    setPages:(state, action: PayloadAction<Pages>)=>{
        state.page = action.payload
    },
    resetGame: (state) => {
      state.won = false
      state.enableMove = false
      state.cards = []
      state.gridSize = 4;
      state.page= Pages.StartGame
    }
    }
})

export const { setWon, setEnableMove, setCards, setGridSize, setPages, resetGame } = gameStatSlice.actions
export default gameStatSlice.reducer
