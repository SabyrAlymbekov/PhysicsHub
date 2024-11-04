import React from 'react'
import { Product } from '@prisma/client'
import Image from 'next/image'

const ShopCard = ({ product }: { product: Product }) => {
  return (
    <div className='w-[270px] flex flex-col gap-4'>
        <div className='w-full h-[250px] bg-gray-200 rounded-[4px]'>
            <Image
                src={product.views[0]}
                alt={product.name}
                width={270}
                height={250}
            ></Image>
        </div>

        <div className='flex flex-col gap-2'>
            <p className='text-lg font-medium'>
                {product.name}
            </p>
            <p className='text-md text-red-500'>
                {product.description} сом
            </p>
        </div>
    </div>
  )
}

export default ShopCard