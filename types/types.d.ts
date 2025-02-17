interface CartItem {
  _id: string;
  product: {
    title: string;
    cost: number;
    availableQuantity: number;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
  cartHash: string;
  updatedItems?: {
    product: {
      title: string;
      availableQuantity?: number;
    };
    changeType: 'quantity' | 'availability';
    quantity?: number;
  }[];
}
export interface GetCartQueryResponse {
  getCart: Cart | null;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: any;
  addItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
}
