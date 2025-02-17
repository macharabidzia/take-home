// app/products/page.tsx
'use client';
import ProductList from '@/components/ProductList';
import React from 'react';
    
import { Toaster } from 'react-hot-toast';

const ProductsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Our Products</h1>
      <ProductList />
      <Toaster />
    </div>
  );
};

export default ProductsPage;
