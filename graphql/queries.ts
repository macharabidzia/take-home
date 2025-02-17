import { gql } from '@apollo/client';

export const GET_CART = gql`
  query GetCart {
    getCart {
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
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      products {
        _id
        title
        cost
        availableQuantity
        isArchived
        createdAt
        updatedAt
      }
      total
    }
  }
`;
