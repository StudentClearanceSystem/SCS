import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';

interface DropdownWithInputProps {
  disabled: boolean;
  initialInputValue: string;
  placeholder?: string;
  buttonLabel?: string;
  bgColor?: string;
  onSubmit: (inputValue: string) => void;
  isOpen: boolean; // Add isOpen prop
  setIsOpen: (isOpen: boolean) => void; // Add setIsOpen prop
}

const DropdownWithInput: React.FC<DropdownWithInputProps> = ({
  disabled,
  initialInputValue,
  placeholder = 'Enter remarks...',
  buttonLabel = 'Submit',
  bgColor = '#6CCEE8',
  onSubmit,
  isOpen,
  setIsOpen,
}) => {
  const [inputValue, setInputValue] = useState(initialInputValue);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setIsOpen(false); // Close the dropdown
  };

  useEffect(() => {
    setInputValue(initialInputValue); // Update inputValue when initialInputValue changes
  }, [initialInputValue]); // Added useEffect to update inputValue when initialInputValue changes

  return (
    <div className="relative inline-block text-left">
      <div className="flex justify-center p-2">
        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center justify-center text-black shadow-sm hover:bg-gray-50 focus:outline-none ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {isOpen ? ( // Change icon based on isOpen state
            <XMarkIcon className="h-4 w-4 text-red-900" /> // Red XMarkIcon when open
          ) : (
            <ChevronDownIcon className="h-4 w-4" /> // ChevronDownIcon when closed
          )}
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
                placeholder={placeholder}
                disabled={disabled}
                rows={3}
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
                  {buttonLabel}
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
