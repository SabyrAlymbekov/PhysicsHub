import React from 'react';
import { CartProvider } from "@/context/CartContext";
import { currentUser } from '@/lib/actions/authActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TbShoppingBag } from "react-icons/tb";

const Layout = async ({ children } : { children: React.ReactNode}) => {
  const user = await currentUser();

  return (
    <CartProvider>
      <div className='container flex flex-row gap-3 my-3 justify-end'>
      <Link href={`/shop/cart`} className='block md:hidden'>
        <Button variant={"outline"} size={"icon"}>
        <TbShoppingBag />
        </Button>
      </Link>
      {user?.role === 'ADMIN' && (
        <Link href='/admin/shop/create'>
          <Button variant='outline'>Загрузить товар</Button>
        </Link>
      )}
      </div>
      {children}
    </CartProvider>
  );
};

export default Layout;