'use client';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Cart } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM_QUANTITY } from '@/graphql/mutations';
import {
  cartAddItemSchema,
  cartRemoveItemSchema,
  cartUpdateItemQuantitySchema,
} from '@/lib/validations';
import toast from 'react-hot-toast';
import { GET_CART } from '@/graphql/queries';
import { detectCartChanges, handleError } from '@/lib/utils';
import CartUpdatePrompt from '@/components/CartUpdatePrompt';
interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  changedCartItem: any;
  showPrompt: boolean;
  setShowPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [addItemMutation] = useMutation(ADD_ITEM);
  const [removeItemMutation] = useMutation(REMOVE_ITEM);
  const [updateItemQuantityMutation] = useMutation(UPDATE_ITEM_QUANTITY);
  const [worker, setWorker] = useState<Worker | null>(null);
  // const [cartHash, setCartHash] = useState<string | null>(null);
  const [changedCart, setChangedCart] = useState([]);
  const { data, error: queryError } = useQuery(GET_CART);
  const cartRef = useRef(cart);
  useEffect(() => {
    if (data?.getCart) {
      setCart(data.getCart);
      cartRef.current = data.getCart;
      setLoading(false);
      initializeWorker(data.getCart.hash);
    } else if (queryError) {
      toast.error('Error fetching cart.');
      setLoading(false);
    }
  }, [data, queryError]);

  useEffect(() => {
    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [worker]);

  const initializeWorker = (cartHash: string) => {
    if (typeof window === 'undefined') return;
    if (worker) {
      worker.terminate();
    }
    const workerUrl = new URL('../utils/cartPolling.worker.js', import.meta.url);
    const newWorker = new Worker(workerUrl);
    newWorker.onmessage = async (event: any) => {
      if (event.data.type === 'cartUpdate') {
        const updatedCart = event.data.data;
        const cartChanges = detectCartChanges(cartRef.current, updatedCart);
        if (cartChanges.length > 0) {
          setChangedCart(cartChanges as any);
          // setCartHash(updatedCart.hash);
          setCart((prevCart) => {
            cartRef.current = { ...updatedCart };
            return updatedCart;
          });
          setShowPrompt(true);
        }
      } else if (event.data.type === 'error') {
        console.error('Worker:', event.data.message);
        toast.error(event.data.message);
      } else if (event.data.type === 'testResponse') {
        console.log('Test response received:', event.data.message);
      }
    };
    newWorker.onerror = (error: any) => {
      console.error('Worker:', error);
    };
    newWorker.postMessage({
      type: 'fetchCart',
      endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      token: localStorage.getItem('visitorToken'),
      cartHash,
    });
    setWorker(newWorker);
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      cartAddItemSchema.parse({ productId, quantity });
      const { data } = await addItemMutation({
        variables: { input: { productId, quantity } },
      });

      if (data?.addItem) {
        setCart(data.addItem.cart);
        toast.success('Item added to cart!');
      }
    } catch (error: any) {
      handleError(error, 'Failed to add item to cart.');
    }
  };

  const removeItem = async (cartItemId: string) => {
    try {
      cartRemoveItemSchema.parse({ cartItemId });
      const { data } = await removeItemMutation({ variables: { input: { cartItemId } } });

      if (data?.removeItem) {
        setCart(data.removeItem);
        toast.success('Item removed from cart!');
      }
    } catch (error: any) {
      handleError(error, 'Failed to remove item.');
    }
  };
  const updateItemQuantity = async (cartItemId: string, quantity: number) => {
    try {
      cartUpdateItemQuantitySchema.parse({ cartItemId, quantity });
      const { data } = await updateItemQuantityMutation({
        variables: { input: { cartItemId, quantity } },
      });

      if (data?.updateItemQuantity) {
        setCart(data.updateItemQuantity);
        toast.success('Quantity updated!');
      }
    } catch (error: any) {
      handleError(error, 'Failed to update quantity.');
    }
  };

  const value = {
    cart,
    loading,
    addItem: addToCart,
    removeItem: removeItem,
    updateItemQuantity: updateItemQuantity,
    changedCartItem: changedCart,
    showPrompt,
    setShowPrompt,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {showPrompt && (
        <CartUpdatePrompt changes={changedCart} onAcknowledge={() => setShowPrompt(false)} />
      )}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
