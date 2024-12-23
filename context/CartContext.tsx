'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {StaticImageData} from "next/image";
import { Product } from '@prisma/client';

interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateSize: (productId: string, size: string) => void;
  money: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [money, setMoney] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const discount = 10; // Скидка 10%

  const addToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateSize = (productId: string, size: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, size } : item
      )
    );
  };

  useEffect(() => {
    const calculatedMoney = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setMoney(calculatedMoney);
  }, [cart]);

  useEffect(() => {
    const calculatedTotal = money + (money * discount / 100);
    setTotal(calculatedTotal);
  }, [money, discount]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, updateSize, money, total }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { useCart, CartProvider };