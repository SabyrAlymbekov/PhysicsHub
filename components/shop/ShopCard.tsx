import React from 'react'
import { Product } from '@prisma/client'
import Image from 'next/image'
const ShopCard = ({ product }: { product: Product }) => {
  console.log(product)
  return (
    <div className='w-[270px] flex flex-col gap-4'>
      <div className='w-full h-[250px] flex items-center justify-center'>
        <div className='w-[270px] h-[250px] bg-gray-100 rounded-[4px] flex items-center justify-center'>
          <div className="w-[190px] h-[180px]">
            <Image
              src={product.views[0]}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-lg font-medium'>
          {product.name}
        </p>
        {
          product.inStock ?
            (<p className='text-md text-text_blue'>
              {product.price} сом
            </p>)
          : (
            <p className="text-md text-black">Нет в наличии</p>
          )
        }

      </div>
    </div>
  )
}

export default ShopCard