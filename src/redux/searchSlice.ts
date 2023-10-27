
'use client'

import { createSlice, configureStore } from '@reduxjs/toolkit'

interface IState {
    blogs: string
}

const initialState: IState = {
    blogs: ''
}

export const searchSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.blogs = action.payload;
        },


    }
})

export const { addTodo } = searchSlice.actions
// export const selectValue = (state) => state.counter.value
export default searchSlice.reducer
