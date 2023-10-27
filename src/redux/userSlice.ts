'use client'

import { createSlice } from "@reduxjs/toolkit"

interface IState {

    user: IUser | null;
    authenticatedUser: IUser | null;
}

const initialState: IState = {
    user: null,
    authenticatedUser: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // addTodo: (state, action) => {
        //     state.users.push(action.payload)
        // },
        loginSuccess: (state, action) => {
            state.user = action.payload
        },

        //     authenticateUser: (state, action) => {
        //         state.authenticatedUser = action.payload;
        //     },
        // }

    }
}
)

export const { loginSuccess } = userSlice.actions

export default userSlice.reducer