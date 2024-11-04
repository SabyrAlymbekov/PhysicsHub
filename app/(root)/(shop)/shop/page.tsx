import React from 'react'
import { currentUser } from '@/lib/actions/authActions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
// import ShopCard from '@/components/shop/ShopCard'

const ShopPage = async () => {
  const user = await currentUser()
  return (
    <div className='container'>
        {user?.role == 'ADMIN' && <Link href='/shop/create'><Button variant='outline'>Загрузить товар</Button></Link>}
        {/* <div className='flex flex-wrap gap-4'>
            {products.map((product) => (
                <ShopCard product={product} />
            ))}
        </div> */}
    </div>
  )
}

export default ShopPage