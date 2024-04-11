'use client';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-50 h-full w-full bg-black opacity-50"
          onClick={toggleMenu} // Close the SideNav when clicking on the overlay
        ></div>
      )}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full flex-col px-4 py-4 transition-all duration-300 md:px-2 ${
          isOpen ? 'md:w-60' : 'md:w-16'
        }`}
        style={{ backgroundColor: isOpen ? '#219EBC' : 'transparent' }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginLeft: '4px' }}
        >
          <div
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-white"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <XMarkIcon className="h-8 w-8 text-gray-800" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-gray-800" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
