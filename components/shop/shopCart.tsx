'use client'
import React, {useState} from 'react';
import {useCart} from "@/context/CartContext";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ProductBlock from "@/components/shop/ProductBlock";
import { IoIosReturnLeft } from "react-icons/io";

import {Separator} from "@/components/ui/separator";

const ShopCart = () => {
  const {cart, money, setTotal, total} = useCart()
  const [discount, setDiscount] = useState<number>(10);
  const end = money + (money * discount / 100)

  const toPay = () => {
    setTotal(end)
  }

  const message = `Привет! Я заказал следующие товары:\n\n${cart
    .map(
      (product) =>
        `${product.name} — ${product.id} — кол-во: ${product.quantity}`
    )
    .join('\n')}\n\nСтрана, адрес и регион:(введите)\n\nНа сумму: ${total} сом`;

  // Кодируем сообщение для URL
  const encodedMessage = encodeURIComponent(message);

  // Ссылка на Telegram с шаблонным сообщением
  const telegramUrl = `https://t.me/Threetree3?text=${encodedMessage}`;

  return (
    <>

      <section className="block md:hidden cart-of-shop mt-5 mb-[80]">
        <div className="container">
          <div className="flex flex-col justify-center items-center w-full">

            <div className="mb-5">
              <Link href="/shop">
                <Button className="block md:hidden">
                <span className="flex gap-3 items-center">
                  <IoIosReturnLeft/>
                  <span>Вернуться в магазин</span>
                </span>
                </Button>
                <Button className="hidden md:block">Вернуться в магазин</Button>
              </Link>
            </div>
            <div className="flex w-[470px] flex-col items-center justify-center gap-5">

              <ul
                className="cart w-full flex flex-col items-center gap-5 border pt-5 rounded-lg md:rounded-none pb-5 md:p-0 md:border-none">
                <li
                  className="w-full justify-items-center md:py-5 md:px-10 text-lg grid grid-cols-1 md:grid-cols-4 md:border rounded-lg font-medium">
                  <span className="hidden md:block col-span-1">Продукт</span>
                  <span className="hidden md:block col-span-1 text-center">Цена</span>
                  <span className="hidden md:block col-span-1 text-center">Количество</span>
                  <span className="hidden md:block col-span-1 text-right">Итого</span>
                  <span className="block md:hidden text-2xl">Товары в корзине</span>
                </li>
                {
                  cart.map(product => (
                    <ProductBlock product={product}/>
                  ))
                }
              </ul>
              <div className="w-full flex mb-10 md:mb-0 justify-center">
                <div
                  className="w-[470px] flex-col flex gap-6 py-6 px-4 md:py-8 md:px-6 border-2 rounded-lg border-black">
                  <p className="text-xl font-semibold">Всего в итоге</p>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                      <span>Вместе</span>
                      <span>{money}</span>
                    </div>
                    <Separator></Separator>
                    <div className="flex justify-between">
                      <span>Доставка</span>
                      <span>{discount ? discount + "%" : "Бесплатно"}</span>
                    </div>
                    <Separator></Separator>
                    <div className="flex justify-between">
                      <span>Итого</span>
                      <span>{end}</span>
                    </div>
                  </div>
                  <Link href={telegramUrl} target="_blank">
                    <Button className="bg-gradient w-full" onClick={() => toPay()}>Перейти к оплате</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="hidden md:block cart-of-shop mt-10 mb-[140px]">
        <div className="container">
          <div className="mb-5">
            <Link href="/shop">
              <Button>Вернуться в магазин</Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-5">

            <ul className="cart flex flex-col gap-5 col-span-2">
              <li className="w-full py-6 px-4 md:py-8 md:px-6 text-lg grid grid-cols-4 border rounded-lg font-medium">
                <span className="col-span-1">Продукт</span>
                <span className="col-span-1 text-center">Цена</span>
                <span className="col-span-1 text-center">Количество</span>
                <span className="col-span-1 text-right">Итого</span>
              </li>
              {
                cart.map(product => (
                  <ProductBlock product={product}/>
                ))
              }
            </ul>
            <div className="w-full flex justify-center col-span-1">
              <div className="w-full h-[300px] flex-col flex gap-6 py-8 px-6 border-2 rounded-lg border-black">
                <p className="text-xl font-semibold">Всего в итоге</p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span>Вместе</span>
                    <span>{money}</span>
                  </div>
                  <Separator></Separator>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span>{discount ? discount + "%" : "Бесплатно"}</span>
                  </div>
                  <Separator></Separator>
                  <div className="flex justify-between">
                    <span>Итого</span>
                    <span>{end}</span>
                  </div>
                </div>
                <Link href={telegramUrl} target="_blank">
                  <Button className="bg-gradient w-full" onClick={() => toPay()}>Перейти к оплате</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopCart;