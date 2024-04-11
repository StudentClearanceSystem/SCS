'use client';
import { useState } from 'react';
import { Bars3Icon, PowerIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SideNavProps {
  title: string; // Specify the type of the title prop as string
  assignTaskBtn: string; // Add buttonText prop
}

export default function SideNav({ title, assignTaskBtn }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50"
          onClick={toggleMenu} // Close the SideNav when clicking on the overlay
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col px-4 py-4 transition-all duration-500 md:w-60 md:px-2 ${
          isOpen ? 'w-full' : 'w-16'
        }`}
        style={{ backgroundColor: isOpen ? '#219EBC' : 'transparent' }}
      >
        <div
          className={`flex items-center justify-between ${
            isOpen ? 'w-12' : 'w-12 md:w-12'
          }`}
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
        {isOpen && (
          <>
            <div className="flex flex-col items-center">
              <div className="mt-5 flex flex-col items-start">
                <p className="text-left text-xl text-black">Hello,</p>
                <h4 className="flex justify-center text-3xl font-bold text-black">
                  {title}
                </h4>
              </div>

              <button className="hover:bg-sky-150 mt-10 flex h-[40px] w-[70%] items-center justify-center gap-2 rounded-full bg-white p-3 text-sm font-bold hover:bg-opacity-75 hover:text-blue-500 md:flex-none md:justify-center md:p-2 md:px-3">
                <div className="flex items-center md:block">
                  {assignTaskBtn}
                </div>
              </button>
            </div>

            <div className="absolute bottom-10 left-0 flex w-full items-center justify-center">
              <button className="hover:bg-sky-150 flex h-[40px] w-[60%] items-center justify-center gap-2 rounded-md p-3 text-sm font-bold hover:text-blue-600 md:flex-none md:justify-center md:p-2 md:px-3 ">
                <PowerIcon className="w-6 flex-shrink-0" />
                <div className="flex items-center md:block">Sign Out</div>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}