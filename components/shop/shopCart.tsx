'use client'
import React from 'react';
import {useCart} from "@/context";

const ShopCart = () => {
  const {cart} = useCart()
  return (
    <div>
      <ul>
        {
          cart.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ShopCart;