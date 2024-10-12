import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter, SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import Link from 'next/link'
import Image from 'next/image'
import {SignInButton} from "@/components/shared/auth/signin-button";
// import {auth} from "@/auth";
import {currentUser} from "@/lib/actions/authActions";
 
export async function Burger() {
    const user = await currentUser()
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
              <SheetTitle>
                  <SheetClose asChild>
                      <Link className="row items-center gap-1" href="/">
                          <Image src="/assets/icons/logo.png" width={40} height={40} alt="physicshub"></Image>
                          <h1 className='h2-bold'>Physicshub</h1>
                      </Link>
                  </SheetClose>
              </SheetTitle>
            <div className='py-4 px-2 flex flex-col gap-3'>
                <SheetClose asChild><Link href="/weekly" className='w-full paragraph-medium'>Задача недели</Link></SheetClose>
                <SheetClose asChild><Link href="/archive"  className='w-full paragraph-medium'>Архив</Link></SheetClose>
                <SheetClose asChild><Link href="/olympiads" className='w-full paragraph-medium'>Олимпиады</Link></SheetClose>
                <SheetClose asChild><Link href="/resources"  className='w-full paragraph-medium'>Материалы</Link></SheetClose>
                <SheetClose asChild><Link href="/shop"  className='w-full paragraph-medium'>Мерч</Link></SheetClose>
            </div>
            <SheetFooter className="xs:hidden">
                <SheetClose asChild>
                    {!user ? (
                            <SignInButton>
                                <Button variant="outline">
                                    Войти
                                </Button>
                            </SignInButton>
                        )
                        :
                        (
                            <Link
                                href={"/profile/" + user.name}
                                className="flex flex-row gap-2 items-center"
                            >
                                <Image src={user.image as string || "/assets/icons/avatar.png"} alt="avatar" width={36} height={36} className="rounded-full"></Image>
                                <h1 className="base-medium">{user.name}</h1>
                            </Link>
                        )
                    }
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