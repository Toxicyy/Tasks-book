import { createSlice } from "@reduxjs/toolkit"
import { User } from "../types/userType"

type UserState = User

const initialState: UserState = {
    id: 0,
    name: '',
    email: '',
    password: '',
    avatarSrc: '',
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
        },
        editName: (state: UserState, action) => { state.name = action.payload },
        editEmail: (state: UserState, action) => { state.email = action.payload },
        editAvatarSrc: (state: UserState, action) => { state.avatarSrc = action.payload },
    }
})

export const { setUser, editName, editEmail } = userSlice.actions
export default userSlice.reducer