
import React from 'react';

const SocialMediaIcons = () => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
        IG
      </div>
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
        FB
      </div>
      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
        TT
      </div>
      <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold">
        TW
      </div>
      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
        YT
      </div>
    </div>
  );
};

export default SocialMediaIcons;
