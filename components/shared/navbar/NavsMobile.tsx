import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from 'next/link'
import Image from 'next/image'
 
export function Burger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
            <Image
                src="/assets/icons/burger.png"
                width='24'
                height='24'
                alt='burger menu icon'
            ></Image>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className='py-4 px-2 flex flex-col gap-3'>
            <SheetClose asChild><Link href="/weekly" className='w-full paragraph-medium'>Задача недели</Link></SheetClose>
            <SheetClose asChild><Link href="/archive"  className='w-full paragraph-medium'>Архив</Link></SheetClose>
            <SheetClose asChild><Link href="/weekly" className='w-full paragraph-medium'>Олимпиады</Link></SheetClose>
            <SheetClose asChild><Link href="/archive"  className='w-full paragraph-medium'>Материалы</Link></SheetClose>
            <SheetClose asChild><Link href="/archive"  className='w-full paragraph-medium'>Мерч</Link></SheetClose>
        </div>
        <SheetFooter>
            <SheetClose asChild>
                <Button variant="outline" className='max-xs:block hidden'>
                    Войти
                </Button>
            </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function NavsMobile() {
  return (
    <div className='hidden max-md:flex'>
        <Burger></Burger>
    </div>
  )
}

export default NavsMobile