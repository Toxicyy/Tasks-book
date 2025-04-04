import { createSlice } from "@reduxjs/toolkit"
import { User } from "../types/userType"

type UserState = User

const initialState: UserState = {
    id: 0,
    name: '',
    email: '',
    password: '',
    options: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
            state.password = action.payload.password
            state.options = action.payload.options
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer