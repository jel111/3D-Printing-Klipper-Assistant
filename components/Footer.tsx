import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 mt-8 py-4">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Klipper & Mainsail Assistant. All Rights Reserved.</p>
      </div>
    </footer>
  );
};