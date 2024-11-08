import React from 'react';
import {CartProvider} from "@/context/CartContext";

const Layout = ({ children } : { children: React.ReactNode}) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>

  );
};

export default Layout;