import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full text-white py-1 mt-8">
    <div className="mx-auto text-center">
      <img src="https://www.umbradigitalcompany.com/assets/images/logos/logo-light.svg" alt="" className="mx-auto w-48 h-auto" />
    </div>
    <div className="flex items-center justify-center mx-auto text-center">
      <p className="text-lg font-semibold">&copy; 2024 Tic-Tac-Toe. All rights reserved</p>
      <span className="mx-2 text-gray-400">|</span>
      <p className="text-md">
        Developed for{' '}
        <a
          href="https://www.umbradigitalcompany.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold hover:underline"
        >
          Umbra Digital
        </a>
      </p>
    </div>
  </footer>
  );
};

export default Footer;