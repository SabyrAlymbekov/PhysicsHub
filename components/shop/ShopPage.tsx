'use client';

// import React, { useEffect, useState } from 'react';
// import { currentUser } from '@/lib/actions/authActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ShopCard from "@/components/shop/ShopCard";
import shirt from './t-shirt.png';

const ShopPage = () => {
  // const [user, setUser] = useState<any>(null);
  //
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const userData = await currentUser();
  //       setUser(userData);
  //     } catch (error) {
  //       console.error("Ошибка при загрузке пользователя:", error);
  //     }
  //   };
  //
  //   fetchUser();
  // }, []);


  const products = [
    {
      id: 0,
      name: "Майка",
      description: "Комфортная майка для летних дней.",
      price: 4000,
      views: [shirt],
      sizes: ["XL", "2XL", "L"],
      inStock: true
    },
    {
      id: 1,
      name: "Рубашка",
      description: "Классическая рубашка для офиса и прогулок.",
      price: 4500,
      views: [shirt],
      sizes: ["XL", "2XL", "L"],
      inStock: true
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <Link href={`/shop/cart`} >
        <Button>Корзина</Button>
      </Link>
      {/*{user?.role === 'ADMIN' && (*/}
      {/*  <Link href='/shop/create'>*/}
      {/*    <Button variant='outline'>Загрузить товар</Button>*/}
      {/*  </Link>*/}
      {/*)}*/}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
        {products.map((product) => (
          <ShopCard
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;