import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../common/models'
import { StringConstants } from '../common/constants'

const initialState: UserState = {
  name: StringConstants.emptyString,
  email: StringConstants.emptyString
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.name = action.payload.name
      state.email = action.payload.email
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
