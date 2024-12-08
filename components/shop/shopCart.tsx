'use client'
import React, { useEffect, useState } from 'react';
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductBlock from "@/components/shop/ProductBlock";
import { IoIosReturnLeft } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { TiTick } from "react-icons/ti";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ShopCart = () => {
  const { cart, money, total } = useCart();
  const discount = 0;
  const [tgId, setTgId] = useState("");
  const [error] = useState("");
  const [adress, setAdress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);

  const showErrorAlert = () => setShowAlert(true);
  const showSuccessAlert = () => setShowAlert1(true);

  const handleTgIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTgId(value);
  };

  const end = money + (money * discount / 100);

  const sendMessage = async () => {
    const message = `Пользователь ${tgId} заказал следующие товары:\n\n${cart
      .map((product) => `${product.name} — ${product.id} — кол-во: ${product.quantity}`)
      .join('\n')}\n\nСтрана, адрес и регион: ${adress} \n\nНа сумму: ${total} сом`;

    const token = "7153702905:AAEd9TfQEo9Kxa3pRBvBvGMwImQcwFku-Gs";
    const URL_API = `https://api.telegram.org/bot${token}/sendMessage`;
    const chatId = "@test_bot_beka";

    try {
      const response = await fetch(URL_API, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });
      const data = await response.json();
      console.log("Message sent:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = () => {
    if (error) {
      showErrorAlert();
    } else {
      showSuccessAlert();
      sendMessage();
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    if (showAlert1) {
      const timer = setTimeout(() => setShowAlert1(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert1]);

  return (
    <>

      <section className="container">
        <div className='mx-auto my-8 p-4 border border-gray-300 rounded-lg'>
        <div className="mb-5">
          <Link href="/shop">
            <Button className="">
                  <span className="flex gap-3 items-center">
                    <IoIosReturnLeft/>
                    <span>Вернуться в магазин</span>
                  </span>
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">Корзина</h1>

        {cart && cart.length > 0 ? (
          <div className="w-full flex flex-col items-center justify-center gap-5">
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
              {cart.map((product, index) => (
                <ProductBlock key={index} product={product}/>
              ))}
            </ul>
            <div className="w-full flex mb-10 md:mb-0 justify-center">
              <div className="w-[470px] flex-col flex gap-6 py-6 px-4 md:py-8 md:px-6 border-2 rounded-lg border-black">
                <p className="text-xl font-semibold">Всего в итоге</p>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Вместе</span>
                    <span>{money}</span>
                  </div>
                  <Separator/>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span>{discount ? `${discount}%` : "Бесплатно"}</span>
                  </div>
                  <Separator/>
                  <div className="flex justify-between">
                    <span>Итого</span>
                    <span>{end}</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient w-full" disabled={cart.length === 0}>
                      Перейти к оплате
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Последний этап</DialogTitle>
                      <DialogDescription>
                        Введите ваш Telegram ID и адрес. С вами свяжутся по поводу оплаты.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 items-center">
                      <Input
                        type="text"
                        value={tgId}
                        onChange={handleTgIdChange}
                        placeholder={"@tg_id..."}
                      />
                      <Input
                        type="text"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        placeholder={"Город, Регион, Адрес..."}
                      />
                    </div>
                    <DialogFooter className="sm:justify-start gap-2">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Закрыть
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="button" onClick={handleSubmit}>
                          Отправить заказ
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Корзина пуста</p>
        )}
        </div>
      </section>

      {/* Alerts */}
      {showAlert && (
        <Alert
          variant="destructive"
          className="fixed top-4 right-4 z-50 bg-white flex items-center shadow-lg"
          style={{width: 'auto'}}
        >
          <Terminal className="h-4 w-4"/>
          <div>
            <AlertTitle>Ошибка!</AlertTitle>
            <AlertDescription>
              Поле для ID Telegram неправильно введено.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {showAlert1 && (
        <Alert
          className="fixed top-4 right-4 z-50 bg-white flex items-center shadow-lg"
          style={{ width: 'auto' }}
        >
          <TiTick className="h-4 w-4 text-green-500" />
          <div>
            <AlertTitle>Успешно!</AlertTitle>
            <AlertDescription>
              Вы отправили заказ, ожидайте...
            </AlertDescription>
          </div>
        </Alert>
      )}
    </>
  );
};

export default ShopCart;