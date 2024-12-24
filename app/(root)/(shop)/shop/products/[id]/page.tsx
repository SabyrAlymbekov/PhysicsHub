import React from 'react';
import ProductPage from "@/components/shop/ProductPage";
import { getProductById } from '@/lib/actions/shop/getProductById';
import { Product } from '@prisma/client';
import { notFound } from 'next/navigation';

const Page = async ( {params} : {
  params: Promise<{ id: string }>
} ) => {
  const id = (await params).id;
  const product: Product | null = await getProductById(id);
  if (!product) {
    notFound();
  }
  return (
    <div className="flex flex-col">
      <ProductPage product={product} />
    </div>
  );
};

export default Page;