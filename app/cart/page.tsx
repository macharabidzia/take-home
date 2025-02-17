// app/cart/page.tsx
'use client';
import CartUpdatePrompt from '@/components/CartUpdatePrompt';
import ShoppingCart from '@/components/ShoppingCart';
import { useCart } from '@/contexts/cart-context';
import React from 'react';
import { Toaster } from 'react-hot-toast';


const CartPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Shopping Cart</h1>
      <ShoppingCart />
      <Toaster />
    </div>
  );
};

export default CartPage;
