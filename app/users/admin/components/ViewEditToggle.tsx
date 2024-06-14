'use client';

import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const ViewEditToggle: React.FC = () => {
  const [isViewOnly, setIsViewOnly] = useState(true);

  const toggleViewOnly = () => {
    setIsViewOnly(true);
  };

  const toggleEdit = () => {
    setIsViewOnly(false);
  };

  return (
    <>
      <div className="fixed right-4 top-4 z-50 flex space-x-4">
        <button
          onClick={toggleViewOnly}
          className="hover:bg-sky-150 mx-2 flex h-[43px] items-center justify-center gap-2 rounded-full bg-yellow-200 p-3 text-sm font-bold hover:bg-opacity-30 hover:text-yellow-900"
        >
          <EyeIcon className="z-40 h-5 w-5 cursor-pointer text-red-600" />
        </button>
        <button
          onClick={toggleEdit}
          className="hover:bg-sky-150 mx-2 flex h-[43px] items-center justify-center gap-2 rounded-full bg-yellow-200 p-3 text-sm font-bold hover:bg-opacity-30 hover:text-yellow-900"
        >
          <PencilIcon className="z-40 h-5 w-5 cursor-pointer text-green-600" />
        </button>
      </div>
      {isViewOnly && (
        <div className="fixed inset-0 z-30 cursor-not-allowed bg-blue-100 bg-opacity-30"></div>
      )}
    </>
  );
};

export default ViewEditToggle;
