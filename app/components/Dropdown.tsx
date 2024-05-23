'use client';
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  onSelect: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Dropdown className="flex justify-center border-1 border-default-200 bg-background">
      <DropdownTrigger>
        <Button radius="full" variant="light">
          {selectedValue || 'USER'}
          <ChevronDownIcon className=" h-3 w-3" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="USER" onClick={() => handleSelect('USER')}>
          USER
        </DropdownItem>
        <DropdownItem key="CASHIER" onClick={() => handleSelect('CASHIER')}>
          CASHIER
        </DropdownItem>
        <DropdownItem
          key="DISCIPLINE"
          onClick={() => handleSelect('DISCIPLINE')}
        >
          DISCIPLINE
        </DropdownItem>
        <DropdownItem key="GUIDANCE" onClick={() => handleSelect('GUIDANCE')}>
          GUIDANCE
        </DropdownItem>
        <DropdownItem key="LIBRARIAN" onClick={() => handleSelect('LIBRARIAN')}>
          LIBRARIAN
        </DropdownItem>
        <DropdownItem key="MIS" onClick={() => handleSelect('MIS')}>
          MIS
        </DropdownItem>
        <DropdownItem
          key="PROGRAM HEAD"
          onClick={() => handleSelect('PROGRAM HEAD')}
        >
          PROGRAM HEAD
        </DropdownItem>
        <DropdownItem
          key="PURCHASING"
          onClick={() => handleSelect('PURCHASING')}
        >
          PURCHASING
        </DropdownItem>
        <DropdownItem key="REGISTRAR" onClick={() => handleSelect('REGISTRAR')}>
          REGISTRAR
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
