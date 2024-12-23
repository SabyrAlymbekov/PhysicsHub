"use client"

import Image from "next/image";
import Navs from "./Navs";
import { Button } from "@/components/ui/button";
import NavsMobile from "./NavsMobile";
import Link from "next/link";
import { TbShoppingBag } from "react-icons/tb";
import ProfileButton from "./ProfileButton";
import {SessionProvider} from "next-auth/react";

export default function Navbar() {
  return (
    <header className="shadow z-50 bg-white w-screen">
      <div className="container">
        <div className="flex w-full justify-between items-center py-3">
          <Link className="row items-center gap-1" href="/">
            <Image
              src="/assets/icons/logo-new-year.png"
              width={40}
              height={40}
              alt="physicshub"
            />
            <h1 className="h2-bold">Physics Hub</h1>
          </Link>

          <Navs />

          <div className="row gap-3">
            <Link href={`/shop/cart`} className="hidden md:block">
              <Button variant={"outline"} size={"icon"}>
                <TbShoppingBag />
              </Button>
            </Link>
            <SessionProvider>
              <ProfileButton />
              <NavsMobile />
              </SessionProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
