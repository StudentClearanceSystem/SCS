'use client';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LogOutBtn from './LogOutBtn';
import { ScrollShadow } from '@nextui-org/react';

interface Button {
  label: string;
  href: string;
  subItems?: Button[];
}

interface SideNavProps {
  title: string;
  assignTaskBtns: Button[];
}

export default function SideNav({ title, assignTaskBtns }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[black] opacity-50" // Overlay with z-index 40
          onClick={toggleMenu} // Close the SideNav when clicking on the overlay
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col px-4 py-4 transition-all duration-500 ${
          isOpen ? 'z-50 w-60 px-4 py-4' : 'z-10 w-12 py-2'
        }`}
        style={{ backgroundColor: isOpen ? '#f4c140' : 'transparent' }}
      >
        <div
          className={`flex items-center justify-between ${
            isOpen ? 'w-12' : 'w-12 md:w-12'
          }`}
          style={{ marginLeft: '4px' }}
        >
          <div
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-white bg-opacity-50 hover:bg-opacity-100"
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
              <div className="flex flex-col items-center pb-10">
                <div className="mt-5 flex flex-col">
                  <div>
                    <p className=" items-start text-xl text-black">Hello,</p>
                  </div>

                  <h4 className="flex justify-center text-3xl font-bold text-black">
                    {title}
                  </h4>
                </div>
                {assignTaskBtns.map((button, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredButton(button.label)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="relative flex w-full flex-col items-center"
                  >
                    <Link
                      href={button.href}
                      className="hover:bg-sky-150 mt-3 flex h-[45px] w-[70%] items-center justify-center gap-2 rounded-full bg-white p-3 text-sm font-bold hover:bg-opacity-75 hover:text-blue-500 md:flex-none md:justify-center md:p-2 md:px-3"
                    >
                      <div className="flex items-center md:block">
                        {button.label}
                      </div>
                    </Link>
                    {button.subItems && hoveredButton === button.label && (
                      <div className="w-[70%]">
                        <div className=" mt-2 flex  flex-col items-center rounded-lg bg-white shadow-lg">
                          {button.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="hover:bg-sky-150 mt-1 flex h-[40px] w-[90%] items-center justify-center gap-2 rounded-full bg-white p-2 text-sm font-bold hover:bg-opacity-75 hover:text-blue-500 md:flex-none md:justify-center"
                            >
                              <div className="flex items-center md:block">
                                {subItem.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
