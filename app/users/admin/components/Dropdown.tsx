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
  const [selectedValue, setSelectedValue] = useState<string>(
    role.toUpperCase(),
  );

  const handleSelect = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    setSelectedValue(lowerCaseValue);
    onSelect(lowerCaseValue);
  };

  useEffect(() => {
    setSelectedValue(role.toUpperCase());
  }, [role]);

  return (
    <Dropdown className="flex justify-center border-1 border-default-200 bg-background">
      <DropdownTrigger>
        <Button radius="full" variant="light">
          {selectedValue || 'USER'}
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {[
          'USER',
          'ADMIN',
          'CASHIER',
          'DISCIPLINE',
          'GUIDANCE',
          'LIBRARIAN',
          'MIS',
          'PROGRAMHEAD',
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
