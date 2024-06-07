import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useState, useEffect, useRef } from 'react';
import { updateDisciplineRemarks, StudentDetailsDiscipline } from './action'; // Import the function and interface

const DropdownWithInput = ({
  disabled,
  remarks,
  studentDetails, // Add studentDetails prop
}: {
  disabled: boolean;
  remarks: string;
  studentDetails: StudentDetailsDiscipline; // Define prop type
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(remarks); // Initialize with remarks
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set the background color variable
  const bgColor = '#BF88FF';

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSubmit = () => {
    const updatedDetails = {
      ...studentDetails,
      discipline_remarks: inputValue,
    };
    updateDisciplineRemarks(updatedDetails);
    setIsOpen(false); // Close the dropdown
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex justify-center p-2">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center justify-center text-black shadow-sm hover:bg-gray-50 focus:outline-none ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <ChevronDownIcon className="h-3 w-3" />
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="relative">
          <div
            className={`absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-56`}
            style={{ backgroundColor: bgColor }}
          >
            <div className="py-1">
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                className="block w-full border-0 px-4 py-2 text-sm text-black focus:ring-0"
                placeholder="Remarks..."
                disabled={disabled}
                rows={3} // Set the number of rows to control the height of the textarea
                style={{ backgroundColor: bgColor }}
              />
              <div className="mt-2 flex justify-center">
                <Button
                  size="sm"
                  type="button"
                  className="bg-primary text-left text-sm text-white hover:bg-[#4b90a3]"
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div
            className="absolute right-1.5 z-40 h-2 border-b-8 border-l-8 border-r-8 border-transparent"
            style={{ borderBottomColor: bgColor }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithInput;
