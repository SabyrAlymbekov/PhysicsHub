'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/CartContext";
import {BsCartFill} from "react-icons/bs";
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
import SwiperOfProduct from "@/components/shop/swiper/swiperOfProduct";
import { Product } from '@prisma/client';
import sendMessageToTG from '@/lib/actions/shop/sendMessage';

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }: ProductPageProps) => {
  const [tgId, setTgId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0]);


  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [adress, setAdress] = useState<string>("");

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlert1, setShowAlert1] = useState<boolean>(false);

  const { cart, addToCart, updateQuantity, removeFromCart, updateSize} = useCart();

  const showErrorAlert = () => setShowAlert(true);
  const showSuccessAlert = () => setShowAlert1(true);


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

  if (!product) {
    return <div>Продукт не найден</div>;
  }


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


  // Найти продукт в корзине
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;


  const endPrice : number = quantity * product.price;

  const sendMessage = async () => {
    const message = `Пользователь ${tgId} заказал следующий товар:\n\n${product.name} — ${product.id} — кол-во:${quantity}\n\nСтрана, адрес и город: ${country},${adress} и ${city} \n\nНа сумму: ${endPrice} сом
    --------------------------`;
    try {
      const res = await sendMessageToTG(message);
      if (res?.error) {
        showErrorAlert();
      }
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
      addToCart(product, "1");
    }
  };

  const handleDecrease = () => {
    if (cartItem && quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else if (cartItem && quantity === 1) {
      removeFromCart(product.id); // Удалить, если количество становится 0
    }
  };
  if(product) {

    return (

      <div className="min-vw-100 min-vh-100 flex items-center justify-center flex-col">


        <section className="PC hidden lg:block page my-12">
          <div className="container">
            <div className="product w-full grid grid-cols-5 gap-20">
              <div className="views col-span-3">
                {
                  product.images.length > 1 ? (
                    <div>
                      <SwiperOfProduct product={product}></SwiperOfProduct>
                      {/*<SwiperOf></SwiperOf>*/}

                    </div>
                  ) : (
                    // <div className="flex justify-center items-center rounded-lg">
                    <div className="views w-full">
                      <SwiperOfProduct product={product}></SwiperOfProduct>
                      {/*<SwiperOf></SwiperOf>*/}
                    </div>

                    // </div>
                  )
                }
                {/*{productID}*/}
                {/*{product.name}*/}
              </div>
              <div className="info col-span-2 flex-col flex">
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
                          <div className={`${selectedSize === size && "bg-gray-800 text-white"} cursor-pointer w-8 h-8 flex items-center justify-center rounded border border-gray-800 text-sm`}
                               key={index}
                               onClick ={() => handleSizeChange(size)}
                          >{size}</div>
                        ))
                      }
                    </div>
                    <div className="btns-to-but flex flex-nowrap gap-4">

                      {
                        quantity < 1 ? (
                          <Button onClick={() => addToCart(product, "1")}><BsCartFill/></Button>
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
            {/*<SwiperOfProduct product={product}></SwiperOfProduct>*/}
          </div>
        </section>



        <section className="modile block lg:hidden page my-12">
          <div className="container flex flex-center">
            <div className="product w-full grid grid-cols-1 sm:grid-cols-5 md:grid-cols-3 gap-0 sm:gap-20">
              <div className="views col-span-3 md:col-span-2">
                {/*{*/}
                {/*  product.views.length > 1 ? (*/}
                {/*    <div>*/}
                {/*      <SwiperOfProduct product={product}></SwiperOfProduct>*/}

                {/*    </div>*/}
                {/*  ) : (*/}
                {/*    // <div className="flex justify-center items-center rounded-lg">*/}
                    <div className=" views">
                      <SwiperOfProduct product={product}></SwiperOfProduct>
                    </div>

                {/*    // </div>*/}
                {/*  )*/}
                {/*}*/}
                {/*{productID}*/}
                {/*{product.name}*/}
              </div>
              <div className="info col-span-2 md:col-span-1 flex-col flex">
                <div className="flex flex-col gap-10">

                  <div className="information flex flex-col gap-6">
                    <div className="texts flex-col flex gap-4">
                      <h1 className="text-3xl font-semibold">{product.name}</h1>
                      {
                        product.inStock ? (
                          <p className="text-sm text-green-500">* В наличии</p>
                        ) : (
                          <p className="text-sm text-red-500">* Нет в наличии</p>
                        )
                      }
                      <div className="flex justify-between">
                        <span className="text-2xl">{product.price} cом</span>
                        <div className="sizes flex gap-3">
                          <span className="text-lg sm:hidden flex flex-wrap">Размеры: </span>
                          {
                            product.sizes.map((size, index) => (
                              <div
                                className={`${selectedSize === size && "bg-gray-800 text-white"} cursor-pointer w-8 h-8 flex items-center justify-center rounded border border-gray-800 text-sm`}
                                key={index}
                                onClick={() => handleSizeChange(size)}
                              >{size}</div>
                            ))
                          }
                        </div>

                      </div>
                    </div>
                    <div className="btns-to-but h-[50px] flex flex-nowrap gap-4 font-bold">

                      {
                        quantity < 1 ? (
                          <Button className="h-full" onClick={() => addToCart(product, "1")}><BsCartFill/></Button>
                        ) : (
                          <div
                            className="qnts w-[159px] rounded-lg border-gray-800 overflow-hidden border flex justify-between items-center">
                            <Button
                              className="rounded-tr-none rounded-br-none h-full"
                              variant="default"
                              onClick={handleDecrease}
                            >
                              -
                            </Button>
                            <span>{quantity}</span>
                            <Button
                              className="rounded-tl-none rounded-bl-none h-full"
                              variant="default" onClick={handleIncrease}>
                              +
                            </Button>
                          </div>
                        )
                      }
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="bg-gradient w-full h-full font-bold"
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
                    <p className="text-sm">{product.description}</p>
                  </div>

                  <Separator/>

                  <div className="paymet-details flex flex-col gap-6">


                  </div>
                </div>

              </div>
            </div>

            {/*<SwiperOfProduct product={product}></SwiperOfProduct>*/}
            {/*<SwiperOf></SwiperOf>*/}
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

        {/*<SwiperOf product={product}></SwiperOf>*/}

      </div>
    );
  } else {
    return (
      <section className="w-screen h-screen flex-center">ERROR</section>
    )
  }
};

export default ProductPage;