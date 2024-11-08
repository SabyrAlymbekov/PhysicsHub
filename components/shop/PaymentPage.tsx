'use client'
import React from 'react';
import { useCart } from "@/context/CartContext";

const PaymentPage = () => {
  const { money, total } = useCart();

  return (
    <div>
      <p>Общая стоимость без скидки: {money} сом</p>
      <p>Итого со скидкой: {total} сом</p>
    </div>
  );
};

export default PaymentPage;