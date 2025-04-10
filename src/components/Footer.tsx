
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-4 mt-10 text-center text-gray-500 text-sm">
      <p className="mb-1">
        ClipCatch supports Instagram, Facebook, Twitter, TikTok, and YouTube
      </p>
      <p>
        &copy; {new Date().getFullYear()} ClipCatch. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
