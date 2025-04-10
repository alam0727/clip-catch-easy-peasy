
import React from 'react';
import { Download } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 text-center">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Download className="h-8 w-8 text-indigo-500" />
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          ClipCatch
        </h1>
      </div>
      <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base">
        Download videos from your favorite social media platforms with ease
      </p>
    </header>
  );
};

export default Header;
