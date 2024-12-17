'use client'
import React, {useState} from 'react';
import Image from 'next/image'
import {Input} from "@/components/ui/input";
import {useCart} from "@/context/CartContext";


interface Product {
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


const ProductBlock = ({product} : Product ) => {
  const {cart, updateQuantity} = useCart();
  const itemCart = cart.find(item => item.id === product.id);
  const [input, setInput] = useState(itemCart.quantity);
  const handleChange = (e) => {
    const value = Math.max(1, Math.min(99, Number(e.target.value))); // Ограничиваем значение от 1 до 99
    setInput(value)
    updateQuantity(product.id, value); // Вызываем updateQuantity с новым значением
  };


  return (
    <>

      <li className="hidden md:grid w-full py-5 px-10 text-lg grid-cols-4 border rounded-lg">
        <div className="flex gap-5 items-center col-span-1">
          <div className="w-[54px] h-[54px]">
            <Image
              src={product.views[0]}
              alt={product.name}
              className="rounded-full w-full h-full"
              width={50}
              height={50}
            />
          </div>
          <span>{product.name}</span>
        </div>
        <span className="col-span-1 flex justify-center items-center">{product.price} сом</span>
        <div className="col-span-1 flex justify-center items-center">
          <Input
            type="number"
            min={1}
            max={99}
            onChange={handleChange}
            value={input.toString().padStart(2, '0')}
            className="w-[60px]"
          />
        </div>
        <span className=" text-right col-span-1 flex justify-end items-center">{product.price * input} сом</span>
      </li>

{/*GHRUGBEGHEGEHGR*/}
      <li className="w-[350px] py-5 px-10 text-lg flex flex-col border rounded-lg md:hidden gap-2 text-sm">
        <div className="flex flex-col gap-7 items-center justify-center">
          <div className="w-[200px] h-[200px] bg-gray-100 rounded-2xl">
            <Image
              src={product.views[0]}
              alt={product.name}
              className="rounded-full w-full h-full"
              width={50}
              height={50}
            />
          </div>
          <span className="text-2xl font-bold">{product.name}</span>
        </div>
        <span className="flex  items-center">Цена: {product.price} сом</span>
        <div className="flex items-center gap-1">
          <span>Кол-во: </span> {" "}
          <Input
            type="number"
            min={1}
            max={99}
            onChange={handleChange}
            value={input.toString().padStart(2, '0')}
            className="w-[40px] h-[30px] text-sm"
          />
        </div>
        <span className=" text-right flex items-center">Итого: {product.price * input} сом</span>
      </li>
    </>
)
  ;
};

export default ProductBlock;