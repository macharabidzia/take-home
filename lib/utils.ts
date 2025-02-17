import { CartItem } from '@/contexts/types';
import { Cart } from '@/types/graphql';
import { clsx, type ClassValue } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const detectCartChanges = (
  oldCart: Cart | null,
  newCart: Cart,
): { item: any; change: string }[] => {
  const changes: { item: any; change: string }[] = [];

  if (!newCart || !oldCart) return changes;

  const oldItems = oldCart.items || [];
  const newItems = newCart.items || [];
  newItems.forEach((newItem) => {
    const oldItem = oldItems.find((item) => item?._id === newItem?._id);

    if (oldItem) {
      if (oldItem.quantity !== newItem.quantity) {
        changes.push({
          item: newItem,
          change: `Quantity changed from ${oldItem.quantity} to ${newItem.quantity}`,
        });
      }
      if (oldItem?.product?.availableQuantity !== newItem?.product?.availableQuantity) {
        changes.push({
          item: newItem,
          change: `${newItem.product.title} vailable quantity changed from ${oldItem?.product?.availableQuantity} to ${newItem?.product?.availableQuantity}`,
        });
      }
      if (newItem?.product?.availableQuantity === 0 && oldItem?.product?.availableQuantity !== 0) {
        changes.push({
          item: newItem,
          change: `${newItem.product.title} is now out of stock'`,
        });
      }
    } else {
      changes.push({
        item: newItem,
        change: `${newItem.product.title} added to cart`,
      });
    }
  });

  // Check for removed items
  oldItems.forEach((oldItem: CartItem) => {
    const newItem = newItems.find((item: CartItem) => item?._id === oldItem?._id);
    if (!newItem) {
      changes.push({
        item: oldItem,
        change: `${oldItem.product.title} removed`,
      });
    }
  });

  return changes;
};
export const handleError = (error: any, defaultMessage: string) => {
  if (error instanceof z.ZodError) {
    error.errors.forEach((e) => toast.error(`Validation error: ${e.message}`));
  } else if (error?.graphQLErrors?.length > 0) {
    error.graphQLErrors.forEach((err: any) => {
      try {
        const parsedMessage = JSON.parse(err.message); // Try to parse error message
        if (Array.isArray(parsedMessage) && parsedMessage.length > 0) {
          parsedMessage.forEach((m: any) => toast.error(m.message || defaultMessage));
        } else {
          toast.error(err.message || defaultMessage);
        }
      } catch (parseError) {
        toast.error(err.message || defaultMessage);
      }
    });
  } else if (error?.networkError) {
    toast.error('Network error. Please check your connection.');
  } else {
    toast.error(error?.message || defaultMessage);
  }
};
