import { configureStore } from '@reduxjs/toolkit'
import gameStatReducer from './gameSlice'
import userReducer from './userSlice'


export const store = configureStore({
    reducer:{
        game: gameStatReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch