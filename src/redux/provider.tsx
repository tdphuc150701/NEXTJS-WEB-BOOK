'use client'



import React from 'react'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from './store'
import Authprovider from '@/component/Authprovider'

interface IProviderProps {
    children: React.ReactNode
}

export function Providers({ children }: IProviderProps) {
    let persistor = persistStore(store)
    return (

        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}