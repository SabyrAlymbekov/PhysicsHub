'use client'

import React from 'react'
import { BsCartFill } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/CartContext";
import { Product } from '@prisma/client';

export interface ShopCardProps {
  product: Product;
}

const ShopCard = ({ product }: ShopCardProps) => {
  const { cart , addToCart, removeFromCart } = useCart()

  return (
    <div className='w-[270px] flex flex-col gap-4'>
      <div className='w-full h-[250px] flex bg-gray-100 items-center justify-center rounded-sm'>
        <div className='relative w-[270px] h-[250px] rounded-[4px] flex items-center justify-center'>
          <div className="w-[190px] h-[180px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-full object-center object-cover"
            />
          </div>
              <div className="menu absolute top-2 left-2">
                <Button onClick={() =>
                  cart.some(item => item.id === product.id)
                    ? removeFromCart(product.id)
                    : addToCart(product)
                }>
                  {
                    cart.some(item => item.id === product.id) ?
                      (
                        <BsCartFill />
                      )
                        :
                      (
                        <BsCartPlus/>
                      )
                  }
                </Button>
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