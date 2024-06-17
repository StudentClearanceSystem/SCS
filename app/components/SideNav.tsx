'use client';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; // Import Link component
import LogOutBtn from './LogOutBtn';
import { ScrollShadow } from '@nextui-org/react';

interface Button {
  label: string;
  href: string; // Adjust the type to accept a string for href
}

interface SideNavProps {
  title: string;
  assignTaskBtns: Button[]; // Modified to accept an array of button objects
}

export default function SideNav({ title, assignTaskBtns }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50" // Overlay with z-index 40
          onClick={toggleMenu} // Close the SideNav when clicking on the overlay
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col px-4 py-4 transition-all duration-500 ${
          isOpen ? 'z-50 w-60 px-4 py-4' : 'z-10 w-12 py-2'
        }`}
        style={{ backgroundColor: isOpen ? '#ffb703' : 'transparent' }}
      >
        <div
          className={`flex items-center justify-between ${
            isOpen ? 'w-12' : 'w-12 md:w-12'
          }`}
          style={{ marginLeft: '4px' }}
        >
          <div
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-white hover:bg-opacity-75"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <XMarkIcon className="z-40 h-8 w-8 text-gray-800" />
            ) : (
              <Bars3Icon className="z-40 h-8 w-8 text-gray-800" />
            )}
          </div>
        </div>
        {isOpen && (
          <>
            <ScrollShadow hideScrollBar className="max-h-[470px]">
              <div className="flex flex-col items-center  pb-1">
                <div className="mt-5 flex  flex-col items-start">
                  <p className="text-left text-xl text-black">Hello,</p>
                  <h4 className="flex justify-center text-3xl font-bold text-black">
                    {title}
                  </h4>
                </div>
                {/* Render buttons dynamically */}
                {assignTaskBtns.map((button, index) => (
                  <Link
                    href={button.href}
                    key={index}
                    className="hover:bg-sky-150 mt-3 flex h-[40px] w-[70%] items-center justify-center gap-2 rounded-full bg-white p-3 text-sm font-bold hover:bg-opacity-75 hover:text-blue-500 md:flex-none md:justify-center md:p-2 md:px-3"
                  >
                    <div className="flex items-center md:block">
                      {button.label}
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollShadow>

            <LogOutBtn />
          </>
        )}
      </div>
    </>
  );
}
