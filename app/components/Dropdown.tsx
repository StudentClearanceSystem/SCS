import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

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
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="text-default-600 focus:outline-none">{label}</button>
      </DropdownTrigger>
      <DropdownMenu>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => onSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
