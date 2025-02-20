// app/cart/components/CartItem.tsx
'use client';
import React from 'react';
import { useCart } from '@/contexts/cart-context';

interface CartItemProps {
  item: any;
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateItemQuantity } = useCart();

  const handleRemoveItem = async (cartItemId: string) => {
    return removeItem(cartItemId);
  };

  const handleQuantityChange = async (cartItemId: string, quantity: number) => {
    if (quantity <= item.product.availableQuantity) {
      return updateItemQuantity(cartItemId, quantity);
    }
  };

  return (
    <tr key={item._id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-500">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap dark:text-white">{item.product.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-500">
        <p className="text-gray-900 whitespace-no-wrap dark:text-white">
          ${item.product.cost.toFixed(2)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-500">
        <input
          type="number"
          min="1"
          defaultValue={item.quantity}
          max={item.product.availableQuantity}
          className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          onBlur={(e) => handleQuantityChange(item._id, parseInt(e.target.value as string))}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-500">
        <p className="text-gray-900 whitespace-no-wrap dark:text-white">
          ${(item.product.cost * item.quantity).toFixed(2)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-500">
        <button
          onClick={() => handleRemoveItem(item._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
