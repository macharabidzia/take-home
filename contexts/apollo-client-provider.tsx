'use client';
import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';

const makeApolloClient = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const httpLink = new HttpLink({
    uri: `https://take-home-be.onrender.com/api`,
  });

  const authLink = setContext(async (_, { headers }) => {
    let token = localStorage.getItem('visitorToken');

    if (!token) {
      try {
        const visitorRegisterMutation = `
          mutation RegisterVisitor {
            register {
              token
            }
          }
        `;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: visitorRegisterMutation }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        token = result.data?.register?.token;

        if (token) {
          localStorage.setItem('visitorToken', token);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const link = authLink.concat(httpLink);
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};
export const client = makeApolloClient();
export const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
