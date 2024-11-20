import React from 'react';
import ProductPage from "@/components/shop/ProductPage";

const Page = ( {params} : {
  params: { productID: string }
} ) => {
  return (
    <div className="flex flex-col">
      <ProductPage productID={params.productID} />
    </div>
  );
};

export default Page;