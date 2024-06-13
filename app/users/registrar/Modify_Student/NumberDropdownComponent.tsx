import React, { useState, useMemo } from 'react';
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
}

const NumberDropdownComponent: React.FC<NumberDropdownComponentProps> = ({
  items,
  label,
  onSelectionChange,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(
    new Set<number>([items[0]]),
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );

  const handleSelectionChange = (keys: Set<number>) => {
    setSelectedKeys(keys);
    onSelectionChange(Number(Array.from(keys).join(', ')));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue || label}
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
