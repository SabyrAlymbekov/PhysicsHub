import React from 'react';
import ProductPage from "@/components/shop/ProductPage";

const Page = ( {params} : {
  params: { id: string }
} ) => {
  return (
    <div className="flex flex-col">
      <ProductPage productID={params.id} />
    </div>
  );
};

export default Page;