import React from 'react';
import { Printer } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <Printer className="w-8 h-8 mr-3 text-primary-500" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          3D Printing & Klipper Assistant
        </h1>
      </div>
    </header>
  );
};