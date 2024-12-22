import React from 'react';
import ShopPage from "@/components/shop/ShopPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Shop",
  description: "Мерч Physics Hub, книги и другие товары для подготовки к олимпиадам по физике"
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <ShopPage/>
    </div>
  );
};

export default Page;