import React from 'react'
import Link from 'next/link'

function Navs() {
  return (
    <nav className='row items-center max-md:hidden'>
        <Link href="/olympiads" className='py-2 px-4'>Олимпиады</Link>
        <Link href="/materials" className='py-2 px-4'>Материалы</Link>
        <Link href="/shop" className='py-2 px-4'>Мерч</Link>
        <Link href="/team" className='py-2 px-4'>Команда</Link>
    </nav>
  )
}


export default Navs