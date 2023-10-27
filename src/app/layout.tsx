'use client'
// import './globals.css'\
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppFooter from '@/component/app.footer'
import AppHeader from '@/component/app.header'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Providers } from '@/redux/provider';
import Authprovider from '@/component/Authprovider';
import { Box, Container } from '@mui/material';



const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#ECECEC" }}>
        <Authprovider>
          <Providers>

            <AppHeader />
            <Container style={{ minHeight: 'calc(90vh - 102px)', marginTop: "30px", backgroundColor: "white" }}>

              {children}

            </Container>
            <AppFooter />

            {/* 
           */}
          </Providers>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Authprovider>
      </body>
    </html >
  )
}
