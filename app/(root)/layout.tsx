import Navbar from '@/components/shared/navbar/Navbar'
import React from 'react'

function Layout({ children } : { children: React.ReactNode}) {
  return (
    <div>
        <Navbar></Navbar>
        <main>
            { children }
        </main>
        {/* <Footer></Footer> */}
    </div>
  )
}

export default Layout