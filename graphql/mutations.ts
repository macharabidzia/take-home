// graphql/mutations.ts
import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register {
    register {
      _id
      token
      cartId
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const ADD_ITEM = gql`
  mutation AddItem($input: AddItemArgs!) {
    addItem(input: $input) {
      _id
      hash
      items {
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

export const REMOVE_ITEM = gql`
  mutation RemoveItem($input: RemoveItemArgs!) {
    removeItem(input: $input) {
      _id
      hash
      items {
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

export const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {
    updateItemQuantity(input: $input) {
      _id
      hash
      items {
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
