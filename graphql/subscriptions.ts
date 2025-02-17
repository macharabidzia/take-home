import { gql } from '@apollo/client';

export const CART_ITEM_UPDATED_SUBSCRIPTION = gql`
  subscription CartItemUpdate {
    cartItemUpdate {
      event
      payload {
        _id
        quantity
        product {
          _id
          title
          cost
          availableQuantity
        }
      }
    }
  }
`;
