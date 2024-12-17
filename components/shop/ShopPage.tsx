'use client';

import React, { useEffect, useState } from 'react';
import { currentUser } from '@/lib/actions/authActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ShopCard from "@/components/shop/ShopCard";
import shirt from './t-shirt.png';

const ShopPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);


  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const products = [
    {
      id: 0,
      name: "Майка",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      price: 4000,
      views: [shirt],
      sizes: ["XL", "2XL", "L"],
      inStock: true
    },
    {
      id: 1,
      name: "Рубашка",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      price: 4000,
      views: [shirt],
      sizes: ["XL", "2XL", "L"],
      inStock: true
    },
  ];

  return (

    <div className='container'>
      <Link href={`/shop/cart`} >
        <Button>
          Корзина
        </Button>
      </Link>
      {user?.role === 'ADMIN' && (
        <Link href='/shop/create'>
          <Button variant='outline'>Загрузить товар</Button>
        </Link>
      )}
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