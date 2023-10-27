'use client'
import { createSlice, configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import userSlice from './userSlice'
import searchSlice from './searchSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    user: userSlice,
    blog: searchSlice,
    counter: counterSlice
})
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    // reducer: {
    //     persistedReducer,
    //     counter: counterSlice,
    //     user: userSlice,
    //     blog: searchSlice

    // }
    reducer: persistedReducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch