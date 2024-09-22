import React from 'react'
import Image from "next/image"
import Navs from './Navs'
import { Button } from '@/components/ui/button'
import NavsMobile from './NavsMobile'
import Link from "next/link";

function Navbar() {
  return (
    <header className='shadow z-50 bg-white fixed w-screen'>
      <div className='container'>
          <div className='flex w-full justify-between items-center py-3'>
            <Link className="row items-center gap-1" href="/">
              <Image src="/assets/icons/logo.png" width={40} height={40} alt="physicshub"></Image>
              <h1 className='h2-bold'>Physicshub</h1>
            </Link>

            <Navs></Navs>

            <div className='row gap-3'>
              <Button variant="outline" className='max-xs:hidden'>
                Войти
              </Button>

              <NavsMobile></NavsMobile>
            </div>
          </div>
      </div>
    </header>
  )
}

export default Navbar