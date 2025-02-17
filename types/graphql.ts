export interface Cart {
  _id: string;
  hash: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  product: Product;
  updatedAt: string;
  addedAt: string;
}

export interface Product {
  _id: string;
  title: string;
  cost: number;
  availableQuantity: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum CartItemEvent {
  ITEM_QUANTITY_UPDATED = 'ITEM_QUANTITY_UPDATED',
  ITEM_OUT_OF_STOCK = 'ITEM_OUT_OF_STOCK',
}

export interface CartItemMessage {
  event: CartItemEvent;
  payload: CartItem;
}

// Add type for the subscription result
export interface SubscriptionResult<T = any> {
  data?: T;
  error?: Error;
  loading: boolean;
}

// Add type for the cartItemUpdate subscription
export interface CartItemUpdateSubscription {
  cartItemUpdate: CartItemMessage;
}
