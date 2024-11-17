'use client'
import dotenv from "dotenv";
dotenv.config();
import React, {ChangeEvent, useEffect, useState} from 'react';
import {getProductById} from "@/lib/actions/shop/getProductById";
import shirt from "@/components/shop/t-shirt.png";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/CartContext";
import {BsCartFill} from "react-icons/bs";
import Link from "next/link";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";
import {TiTick} from "react-icons/ti";

interface Product {
  id: number;
  name: string;
  price: number;
  views: string[];
  sizes: string[];
  inStock: boolean;
  description: string;
}

const ProductPage = ({productID}) => {
  const products = [
    {
      id: 0,
      name: "Майка",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      price: 4000,
      views: [shirt],
      sizes: ["XL", "2XL", "L"],
      inStock: true
    },
    {
      id: 1,
      name: "Рубашка",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      price: 4000,
      views: [shirt],
      sizes: ["XL", "2XL", "L"],
      inStock: true
    },
  ];



  const product: Product = products[productID];



  // const product = getProductById(productID);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [tgId, setTgId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0]);


  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [adress, setAdress] = useState<string>("");

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlert1, setShowAlert1] = useState<boolean>(false);


  const showErrorAlert = () => setShowAlert(true);
  const showSuccessAlert = () => setShowAlert1(true);


  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    if (cartItem) {
      updateSize(product.id, size);
    }
  };


  const handleTgIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTgId(value);
    if (!/^@([A-Za-z0-9_]{5,})$/.test(value)) {
      setError("Введите корректный Telegram ID (например, @username)");
    } else {
      setError("");
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

  // Найти продукт в корзине
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;


  const endPrice : number = quantity * product.price;

  const sendMessage = async () => {
    const message = `Пользователь ${tgId} заказал следующий товар:\n\n${product.name} — ${product.id} — кол-во:${quantity}\n\nСтрана, адрес и город: ${country},${adress} и ${city} \n\nНа сумму: ${endPrice} сом
    --------------------------`;

    const token: string = "7153702905:AAEd9TfQEo9Kxa3pRBvBvGMwImQcwFku-Gs";
    const URL_API: string = `https://api.telegram.org/bot${token}/sendMessage`;
    const chatId: string = "@test_bot_beka"; // Убедитесь, что вы используете правильный идентификатор чата.

    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML", // Добавлено для лучшего форматирования текста (опционально).
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

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


  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(product.id, quantity + 1);
    } else {
      addToCart(product);
    }
  };

  const handleDecrease = () => {
    if (cartItem && quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else if (cartItem && quantity === 1) {
      removeFromCart(product.id); // Удалить, если количество становится 0
    }
  };

  return (

    <>
      <section className="page my-12">
        <div className="container">
          <div className="product w-full grid grid-cols-2">
            <div className="views">
              {
                product.views.length > 1 ? (
                  <div>

                  </div>
                ) : (
                  <div className="col-span-1 flex justify-center items-center rounded-lg">
                    <div className="w-[500px] h-[600px] bg-gray-100 flex justify-center items-center">
                      <div className="w-[446px]">
                        <Image
                          src={product.views[0]}
                          alt={product.name}
                          width={446}
                          height={446}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
              {/*{productID}*/}
              {/*{product.name}*/}
            </div>
            <div className="info flex-col flex">
              <div className="flex flex-col gap-10">

                <div className="information flex flex-col gap-6">
                  <div className="texts flex-col flex gap-4">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    {
                      product.inStock ? (
                        <p className="text-sm text-green-500">* В наличии</p>
                      ) : (
                        <p className="text-sm text-red-500">* Нет в наличии</p>
                      )
                    }
                    <h2 className="text-2xl">{product.price} cом</h2>
                  </div>
                  <p className="text-sm">{product.description}</p>
                </div>

                <Separator/>

                <div className="paymet-details flex flex-col gap-6">
                  <div className="sizes flex gap-3">
                    <span className="text-xl">Size: </span>
                    {
                      product.sizes.map((size, index) => (
                        <div className={`${selectedSize === size && "bg-gray-800 text-white"} w-8 h-8 flex items-center justify-center rounded border border-gray-800 text-sm`}
                             key={index}
                             onClick ={() => handleSizeChange(size)}
                        >{size}</div>
                      ))
                    }
                  </div>
                  <div className="btns-to-but flex flex-nowrap gap-4">

                    {
                      quantity < 1 ? (
                        <Button onClick={() => addToCart(product)}><BsCartFill/></Button>
                      ) : (
                        <div
                          className="qnts w-[159px] rounded-lg border-gray-800 overflow-hidden border flex justify-between items-center">
                          <Button
                            className="rounded-tr-none rounded-br-none"
                            variant="default"
                            onClick={handleDecrease}
                          >
                            -
                          </Button>
                          <span>{quantity}</span>
                          <Button
                            className="rounded-tl-none rounded-bl-none"
                            variant="default" onClick={handleIncrease}>
                            +
                          </Button>
                        </div>
                      )
                    }
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-gradient w-full"
                          onClick={() => {
                            const isInCart = cart.some(item => item.id === product.id);
                            if (!isInCart) {
                              addToCart(product, selectedSize || product.sizes[0]); // Передаем выбранный размер или первый из доступных
                            }
                          }}
                        >
                          Купить Сейчас
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Покупка</DialogTitle>
                          <DialogDescription>
                            Введите ваш Telegram ID и адрес. С вами свяжутся по поводу оплаты.
                            <br/>
                            Вы выбрали <span className="font-semibold">{product.name}</span>, размер <span
                            className="font-semibold">{selectedSize}</span>, кол-во <span
                            className="font-semibold">{quantity}</span>, на сумму <span
                            className="font-semibold">{endPrice}</span>
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
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder={"Страна..."}
                          />
                          <Input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={"Город..."}
                          />
                          <Input
                            type="text"
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                            placeholder={"Адрес..."}
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

            </div>
          </div>

        </div>
      </section>


      {showAlert && (
        <Alert
          variant="destructive"
          className="fixed top-4 right-4 z-50 bg-white flex items-center shadow-lg"
          style={{width: "auto"}}
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
          style={{width: "auto"}}
        >
          <TiTick className="h-4 w-4 text-green-500"/>
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

export default ProductPage;