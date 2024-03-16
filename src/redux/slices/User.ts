
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userSlice {
    user: null | object
}

const initialState: userSlice = {
    user: null
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoginUser: (state, action: PayloadAction<userSlice>) => {
            state.user = action.payload.user;
        },
        LogOutUser: (state) => {
            state.user = null;
        }
    },
})

export const { LoginUser, LogOutUser } = UserSlice.actions
export default UserSlice.reducer