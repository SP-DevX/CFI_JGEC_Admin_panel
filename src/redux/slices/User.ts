
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface userSlice {
    user: null | object,
    token: string
}

const initialState: userSlice = {
    user: null,
    token: ""
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LoginUser: (state, action: PayloadAction<userSlice>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        LogOutUser: (state) => {
            state.token = "";
            state.user = null;
        }
    },
})

export const { LoginUser, LogOutUser } = UserSlice.actions
export default UserSlice.reducer