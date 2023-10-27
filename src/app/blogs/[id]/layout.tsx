// import './globals.css'\

import type { Metadata } from 'next'



export const metadata: Metadata = {
    title: 'View Blog',
    description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>

            {children}

        </div>
    )
}
