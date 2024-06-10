import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  const handleClear = () => {
    setSelectedOption(null);
    onSelect('');
  };

  return (
    <label className="flex items-center space-x-0.5 text-tiny text-default-400">
      {label}:
      <select
        value={selectedOption || ''}
        onChange={handleSelect}
        className="border-none bg-transparent pr-6 text-xs text-default-400 outline-none"
      >
        <option value="" disabled hidden>
          {selectedOption ? selectedOption : 'Select'}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOption && (
        <button className="text-xs " onClick={handleClear}>
          <XCircleIcon className="h-4 text-red-500" />
        </button>
      )}
    </label>
  );
};

export default DropdownComponent;
