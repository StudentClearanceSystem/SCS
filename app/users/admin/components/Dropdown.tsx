'use client';
import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  role: string;
  onSelect: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({ role, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>(role);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  useEffect(() => {
    setSelectedValue(role);
  }, [role]);

  return (
    <Dropdown className="flex justify-center border-1 border-default-200 bg-background">
      <DropdownTrigger>
        <Button radius="full" variant="light">
          {selectedValue || 'USER'}
          <ChevronDownIcon className=" h-3 w-3" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {[
          'USER',
          'CASHIER',
          'DISCIPLINE',
          'GUIDANCE',
          'LIBRARIAN',
          'MIS',
          'PROGRAM HEAD',
          'PURCHASING',
          'REGISTRAR',
        ].map((role) => (
          <DropdownItem key={role} onClick={() => handleSelect(role)}>
            {role}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
