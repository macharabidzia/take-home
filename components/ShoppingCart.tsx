'use client';
import { useCart } from '@/contexts/cart-context';
import React from 'react';
import CartItem from './CartItem';

const ShoppingCart = () => {
  const { cart, loading } = useCart();

  if (loading) return <p className="dark:text-white">Loading cart...</p>;
  if (!cart || !cart.items || cart.items.length === 0)
    return <p className="dark:text-white">Cart is empty.</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-500 dark:text-white">
                Product
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-500 dark:text-white">
                Price
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-500 dark:text-white">
                Quantity
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-500 dark:text-white">
                Total
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-500 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <h2 className="text-lg dark:text-white">
          Cart Total: $
          {cart.items
            .reduce((total, item) => total + item.product.cost * item.quantity, 0)
            .toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default ShoppingCart;
