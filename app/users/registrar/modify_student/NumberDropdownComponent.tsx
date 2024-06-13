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
    <Dropdown
      classNames={{
        base: 'before:bg-default-200', // change arrow background
        content:
          'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
      }}
    >
      <DropdownTrigger>
        <Button
          endContent={<ChevronDownIcon className="h-3" />}
          variant="bordered"
          className="mt-5"
        >
          {selectedValue !== undefined ? selectedValue : label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className=" min-w-0"
        aria-label={label}
        variant="light"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        itemClasses={{
          base: [
            'rounded-sm',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-300',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
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
