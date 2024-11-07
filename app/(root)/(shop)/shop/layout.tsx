import React from 'react';
import {CartProvider} from "@/context";

const Layout = ({ children } : { children: React.ReactNode}) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>

  );
};

export default Layout;