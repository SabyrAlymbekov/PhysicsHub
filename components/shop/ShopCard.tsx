'use client'
import { BsCartFill } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/CartContext";
import Link from "next/link";
import {useState} from "react";
import { Product } from "@prisma/client";

interface ShopProduct {
  Product: Product
}

const ShopCard = ({ Product } : ShopProduct) => {
  const { cart , addToCart, removeFromCart } = useCart()


  const [show, setShow] = useState(false);
  return (

      <div
        onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
        className='relative w-[270px] flex flex-col gap-4'>
        {
          show && (
            <div className="menu absolute top-2 left-2 z-50">
              <Button onClick={() =>
                cart.some(item => item.id === Product.id)
                  ? removeFromCart(Product.id)
                  : addToCart(Product, "1")
              }>
                {
                  cart.some(item => item.id === Product.id) ?
                    (
                      <BsCartFill/>
                    )
                    :
                    (
                      <BsCartPlus/>
                    )
                }
              </Button>
            </div>
          )
        }
        <Link href={`/shop/product/${Product.id}`}>

        <div className='w-full h-[250px] flex bg-gray-100 items-center justify-center'>
          <div
               className='relative w-[270px] h-[250px] rounded-[4px] flex items-center justify-center'>
            <div className="w-[190px] h-[180px]">
              <Image
                src={Product.images[0]}
                alt={Product.name}
                width={100}
                height={100}
                className="w-full h-full object-center object-cover"
              />
            </div>

          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-lg font-medium'>
            {Product.name}
          </p>
          {
            Product.inStock ?
              (<p className='text-md text-text_blue'>
                {Product.price} сом
              </p>)
              : (
                <p className="text-md text-black">Нет в наличии</p>
              )
          }

        </div>
        </Link>

      </div>
  )
}

export default ShopCard