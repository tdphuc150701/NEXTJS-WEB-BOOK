'use client'
import React from 'react';
import { SessionProvider } from 'next-auth/react'
interface IProviderProps {
    children: React.ReactNode
}

const Authprovider = ({ children }: IProviderProps) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default Authprovider