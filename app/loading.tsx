// app/loading.tsx
import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-gray-300"></div>
    </div>
  );
};

export default Loading;
