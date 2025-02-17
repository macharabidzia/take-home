import React from 'react';
import { useQuery } from '@apollo/client';
import { z } from 'zod';
import { useCart } from '@/contexts/cart-context';
import { GET_PRODUCTS } from '@/graphql/queries';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const { addItem } = useCart();

  if (loading) return <p className="dark:text-white text-center py-4">Loading products...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center py-4">Error fetching products: {error.message}</p>
    );

  const addToCart = async (productId: string) => {
    await addItem(productId, 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">Our Products</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {data?.getProducts?.products.map((product: any) => (
          <Card
            key={product._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" // Responsive widths
          >
            <CardHeader className="flex justify-center">
              <CardTitle className="text-xl font-semibold mb-2 dark:text-white text-center">
                {product.title}
              </CardTitle>
            </CardHeader>
            <CardDescription className="text-gray-600 dark:text-gray-400 mb-4 text-center">
              Price: ${product.cost.toFixed(2)} <br />
              Availability: {product.availableQuantity}
            </CardDescription>
            <CardFooter className="flex justify-center">
              <Button onClick={() => addToCart(product._id)}>Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
