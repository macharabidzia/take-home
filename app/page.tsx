import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">Real-time Cart App</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Go to products to explore</p>
      <Link href="/products">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Shopping
        </button>
      </Link>
    </div>
  );
};
export default Home;
