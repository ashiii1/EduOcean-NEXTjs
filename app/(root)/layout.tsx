import React, { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next'


export const metadata: Metadata={
  title:"EduOcean",

description:"Learning  APP",
icons:{
  icon: '/icons/imas.png'
}}
const RootLayout = ({children}: {children : ReactNode}) => {
  return (
    <main>
<StreamVideoProvider>

        {children}
        </StreamVideoProvider>

        </main>
  )
}

export default RootLayout
