'use client'
import { BsCartFill } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/CartContext";
import Link from "next/link";

interface ShopCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    sizes: string[];
    inStock: boolean;
  }
}

const ShopCard = ({ product  }: ShopCardProps) => {
  // console.log(product)
  const { cart , addToCart, removeFromCart } = useCart()


  const [show, setShow] = React.useState(false);
  return (

      <div
        onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
        className='relative w-[270px] flex flex-col gap-4'>
        {
          show && (
            <div className="menu absolute top-2 left-2 z-50">
              <Button onClick={() =>
                cart.some(item => item.id === product.id)
                  ? removeFromCart(product.id)
                  : addToCart(product)
              }>
                {
                  cart.some(item => item.id === product.id) ?
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
        <Link href={`/shop/${product.id}`}>

        <div className='w-full h-[250px] flex bg-gray-100 items-center justify-center'>
          <div
               className='relative w-[270px] h-[250px] rounded-[4px] flex items-center justify-center'>
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
        </Link>

      </div>
  )
}

export default ShopCard