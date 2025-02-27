import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Set a timeout to hide the loader after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the loader after 2 seconds
    }, 2000); // 2000ms = 2 seconds

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
        <div className="relative w-32 h-24">
          <div className="absolute bottom-8 left-12 w-8 h-8 bg-teal-500 rounded-full animate-bounce"></div>
          <div className="absolute top-0 right-0 w-12 h-1 rounded-md bg-gray-100 shadow-[-35px_50px_0_rgba(242,242,242,1),_-70px_95px_0_rgba(242,242,242,1)] animate-step"></div>
        </div>
      </div>
    )
  );
};

export default Loader;
