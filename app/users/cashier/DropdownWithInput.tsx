import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';

const DropdownWithInput = ({ disabled }: { disabled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="flex justify-end p-2">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center justify-center text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="block w-full border-0 px-4 py-2 text-sm text-gray-700 focus:ring-0"
              placeholder="Remarks..."
              disabled={disabled}
            />
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => alert(`You typed: ${inputValue}`)}
              disabled={disabled}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithInput;
