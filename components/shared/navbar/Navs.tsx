import React from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

export function DropdownTasksMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Задачи</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem><Link href="/weekly" className='w-full'>Задача недели</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/archive"  className='w-full'>Архив</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Navs() {
  return (
    <nav className='row items-center max-md:hidden'>
        <DropdownTasksMenu></DropdownTasksMenu>
        <Link href="/olympiads" className='py-2 px-4'>Олимпиады</Link>
        <Link href="/resources" className='py-2 px-4'>Материалы</Link>
        <Link href="/shop" className='py-2 px-4'>Мерч</Link>
        <Link href="/team" className='py-2 px-4'>Команда</Link>
    </nav>
  )
}


export default Navs