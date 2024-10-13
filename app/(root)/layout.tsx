import Navbar from '@/components/shared/navbar/Navbar'
import React from 'react'
import Footer from "@/components/shared/footer/footer";

function Layout({ children } : { children: React.ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <main>
            { children }
        </main>
         {/*<Footer></Footer>*/}
    </div>
  )
}

export default Layout