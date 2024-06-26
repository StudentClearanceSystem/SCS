import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

// Tertiary programs array
const tertiaryPrograms = [
  'BSIT',
  'BSCS',
  'BSCPE',
  'ACT',
  'ASCT',
  'ART',
  'BSBAOM',
  'BSAIS',
  'BSA',
  'BSRTCS',
  'BACOMM',
  'BAPSYCH',
  'BSTM',
];

// SHS programs array
const shsPrograms = [
  'ABM',
  'STEM',
  'HUMSS',
  'GAS',
  'MAWD',
  'DIGAR',
  'TOPER',
  'RESCO',
  'CUART',
];

// Function to check if a program is a tertiary program
const isTertiaryProgram = (program: string) => {
  return tertiaryPrograms.includes(program); // Checks if the program is in the tertiaryPrograms array
};

// Function to check if a program is an SHS program
const isShsProgram = (program: string) => {
  return shsPrograms.includes(program); // Checks if the program is in the shsPrograms array
};

const DropdownComponent: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Initial state set to null

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  const handleClear = () => {
    setSelectedOption(null);
    onSelect('');
  };

  // Filter options into categories
  const tertiaryOptions = options.filter(isTertiaryProgram);
  const shsOptions = options.filter(isShsProgram);
  const otherOptions = options.filter(
    (option) => !isTertiaryProgram(option) && !isShsProgram(option),
  );

  return (
    <label className="flex items-center space-x-0.5 text-tiny text-default-400">
      {label}:
      <select
        value={selectedOption || ''}
        onChange={handleSelect}
        className="border-none bg-transparent pr-6 text-xs text-default-400 outline-none"
      >
        <option value="" disabled hidden>
          Select
        </option>
        <optgroup>
          {tertiaryOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </optgroup>

        <optgroup>
          {shsOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </optgroup>

        {otherOptions.length > 0 && (
          <optgroup>
            {otherOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </optgroup>
        )}
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
