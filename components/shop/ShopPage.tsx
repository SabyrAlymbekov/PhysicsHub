import React from 'react';
import { currentUser } from '@/lib/actions/authActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ShopCard from "@/components/shop/ShopCard";
import { getAllProducts } from '@/lib/actions/shop/getAllProducts';

const ShopPage = async () => {
  const user = await currentUser();
  const products = await getAllProducts();

  return (

    <div className='container'>
      <Link href={`/shop/cart`} >
        <Button>
          Корзина
        </Button>
      </Link>
      {user?.role === 'ADMIN' && (
        <Link href='/admin/shop'>
          <Button variant='outline'>Загрузить товар</Button>
        </Link>
      )}
      <div className='flex flex-col gap-[40px] my-10'>
          <div className='flex flex-row gap-[8px]'>
            <div className='w-[20px] rounded-sm bg-blue-500'></div>
            <h3 className="font-semibold text-base">Все продукты</h3>
          </div>
        <div className='flex flex-wrap flex-row max-w-[1170px] m-auto gap-[30px] justify-center'>
          {products.map((product) => (
            <ShopCard
              product={product}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default ShopPage;