import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
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

  // Changed event type to React.ChangeEvent<HTMLTextAreaElement>
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
          <div className="absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-md bg-[#6CCEE8] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-56">
            <div className="py-1">
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                className="block w-full border-0 bg-[#6CCEE8] px-4 py-2 text-sm text-black focus:ring-0"
                placeholder="Remarks..."
                disabled={disabled}
                rows={3} // Set the number of rows to control the height of the textarea
              />
              <div className="mt-2 flex justify-center">
                <Button
                  size="sm"
                  type="button"
                  className=" text-left text-sm text-gray-700 hover:bg-[#4b90a3]"
                  onClick={() => alert(`You typed: ${inputValue}`)}
                  disabled={disabled}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute right-1.5 z-40 h-2 border-b-8 border-l-8 border-r-8 border-transparent border-b-[#6CCEE8]"></div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithInput;
