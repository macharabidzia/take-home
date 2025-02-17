// app/layout.tsx
import { siteConfig } from '@/config/site';
import './globals.css';
import Loading from '@/app/loading';
import Link from 'next/link';
import React from 'react';
import { Suspense } from 'react';
import { CartProvider } from '@/contexts/cart-context';
import { ApolloClientProvider } from '@/contexts/apollo-client-provider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>{siteConfig.name}</title>
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <ApolloClientProvider>
          <CartProvider>
            <header className="bg-white dark:bg-gray-800 shadow">
              <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                  <div>
                    <Link
                      href="/"
                      className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      🛒 Real-time Cart
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/products"
                      className="py-2 px-3 text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Products
                    </Link>
                    <Link
                      href="/cart"
                      className="py-2 px-3 text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Cart
                    </Link>
                  </div>
                </div>
              </nav>
            </header>
            <main className="container mx-auto mt-10 p-6">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
          </CartProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
