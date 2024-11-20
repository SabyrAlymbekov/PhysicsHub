import React, { Suspense } from 'react';
import ShopCard from "@/components/shop/ShopCard";
import { getAllProductsByCategory } from '@/lib/actions/shop/getAllProducts';
import { Card } from '../ui/card';
import { categories } from '@/constants/categories';
import Link from 'next/link';
import ProductListFallback from './ProductListFallback';

const ProductList = async ({category}: {category: string}) => {
  const products = await getAllProductsByCategory(category);
  return <div className='flex flex-wrap flex-row max-w-[1170px] m-auto gap-[30px] justify-center'>
  {products.map((product) => (
    <ShopCard
      product={product}
      key={product.id}
    />
  ))}
</div>
}

const ShopPage = async ({category} : {category?: string}) => {
  return (
    <div className='container'>
      <div className='flex flex-row gap-2 flex-wrap justify-center md:justify-start w-full'>
        {
          categories.map((c, i) => <Link href={c.link} key={i}>
          <Card className='w-32 h-25 py-3 px-4 flex items-center flex-col justify-center gap-3'>
          {c.image}
          <h1 className='font-semibold'>{c.name}</h1>
        </Card></Link>)
        }
      </div>
      <div className='flex flex-col gap-[40px] my-10'>
          <div className='flex flex-row gap-[8px]'>
            <div className='w-[20px] rounded-sm bg-blue-500'></div>
            <h3 className="font-semibold text-base">Все продукты</h3>
          </div>
          <Suspense fallback={<ProductListFallback></ProductListFallback>}>
        <ProductList category={category || ''}></ProductList>
       </Suspense>
      </div>
    </div>
  );
};


export default ShopPage;