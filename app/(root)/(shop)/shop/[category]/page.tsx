import React from 'react';
import ShopPage from "@/components/shop/ShopPage";

const Page = async ({
    params,
  }: {
    params: Promise<{ category: string }>
  }) => {
    const category = (await params).category
    
    return (
        <div className="flex flex-col">
        <ShopPage category={category}/>
        </div>
    );
};

export default Page;