import React, { useState, useMemo, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from '@nextui-org/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface StringDropdownComponentProps {
  items: string[];
  label: string;
  onSelectionChange: (value: string) => void;
  selectedValue: string; // Add selectedValue to props
}

const StringDropdownComponent: React.FC<StringDropdownComponentProps> = ({
  items,
  label,
  onSelectionChange,
  selectedValue, // Destructure selectedValue
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set<string>([selectedValue]),
  );

  useEffect(() => {
    setSelectedKeys(new Set<string>([selectedValue]));
  }, [selectedValue]);

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
    onSelectionChange(Array.from(keys).join(', '));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          endContent={<ChevronDownIcon className="h-3" />}
          variant="bordered"
          className="mt-5 capitalize"
        >
          {selectedValue || label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={label}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys: Selection) =>
          handleSelectionChange(keys as Set<string>)
        }
      >
        {items.map((item) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default StringDropdownComponent;
