import React from 'react'
import { currentUser } from '@/lib/actions/authActions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ShopCard from "@/components/shop/ShopCard";
import {getAllProducts} from "@/lib/actions/shop/getAllProducts";
import shopCard from "@/components/shop/ShopCard";
// import ShopCard from '@/components/shop/ShopCard'
import shirt from './t-shirt.png'


const ShopPage = async () => {
  const user = await currentUser()
  // const products = await getAllProducts()
  const products = [
    {
      id: 0,
      name: "Майка",
      description:  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae distinctio ea eum impedit, possimus quaerat suscipit! Adipisci aut autem beatae eligendi facere itaque officia, sed vel voluptatibus. Accusantium aliquam animi beatae blanditiis consectetur dolorem eos fugiat ipsam laborum libero minus numquam, odio officia quasi quibusdam sequi veniam. Doloremque, fugit voluptatem.",
      views: 100,
      price: 4000,
      views: [shirt],
      sizes: ["XL", "2XL", "L"],
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  console.log(products)
  return (
    <div className='container'>
      {user?.role == 'ADMIN' && <Link href='/shop/create'><Button variant='outline'>Загрузить товар</Button></Link>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
        {
          products.map((product, index) => (
            <ShopCard product={product} key={index}/>
          ))
        }
       </div>


    </div>
  )
}

export default ShopPage