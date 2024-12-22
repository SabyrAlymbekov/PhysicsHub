import React from 'react'
import Image from "next/image"
import Navs from './Navs'
import { Button } from '@/components/ui/button'
import NavsMobile from './NavsMobile'
import Link from "next/link";
import {SignInButton} from "@/components/shared/auth/signin-button";
import {currentUser} from "@/lib/actions/authActions";
import { TbShoppingBag } from "react-icons/tb";

async function Navbar() {
    const user = await currentUser()
  return (
    <header className='shadow z-50 bg-white w-screen'>
      <div className='container'>
          <div className='flex w-full justify-between items-center py-3'>
            <Link className="row items-center gap-1" href="/">
              <Image src="/assets/icons/logo-new-year.png" width={40} height={40} alt="physicshub"></Image>
              <h1 className='h2-bold'>Physics Hub</h1>
            </Link>

            <Navs></Navs>

            <div className='row gap-3'>
            <Link href={`/shop/cart`} className='hidden md:block'>
        <Button variant={"outline"} size={"icon"}>
        <TbShoppingBag />
        </Button>
      </Link>
                {!user ? (
                        <SignInButton>
                            <Button variant="outline" className='max-xs:hidden'>
                                Войти
                            </Button>
                        </SignInButton>
                    )
                    :
                    (
                        <Link
                            href={"/profile/" + user.id}
                            className='max-xs:hidden'
                        >
                            <Image src={user.image as string || "/assets/icons/avatar.png"} alt="avatar" width={36} height={36} className="rounded-full  w-[36px] h-[36px]"></Image>
                        </Link>
                    )
                }

              <NavsMobile></NavsMobile>
            </div>
          </div>
      </div>
    </header>
  )
}

export default Navbar