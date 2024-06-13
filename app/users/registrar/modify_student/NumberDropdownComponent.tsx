import React, { useState, useMemo, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from '@nextui-org/react';

interface NumberDropdownComponentProps {
  items: number[];
  label: string;
  onSelectionChange: (value: number) => void;
  selectedValue: number; // Add selectedValue to props
}

const NumberDropdownComponent: React.FC<NumberDropdownComponentProps> = ({
  items,
  label,
  onSelectionChange,
  selectedValue, // Destructure selectedValue
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(
    new Set<number>([selectedValue]),
  );

  useEffect(() => {
    setSelectedKeys(new Set<number>([selectedValue]));
  }, [selectedValue]);

  const handleSelectionChange = (keys: Set<number>) => {
    setSelectedKeys(keys);
    onSelectionChange(Number(Array.from(keys).join(', ')));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="mt-5 capitalize">
          {selectedValue !== undefined ? selectedValue : label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={label}
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys: Selection) =>
          handleSelectionChange(keys as Set<number>)
        }
      >
        {items.map((item) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NumberDropdownComponent;
