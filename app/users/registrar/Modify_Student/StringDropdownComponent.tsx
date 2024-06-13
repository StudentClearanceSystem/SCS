import React, { useState, useMemo } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from '@nextui-org/react';

interface StringDropdownComponentProps {
  items: string[];
  label: string;
  onSelectionChange: (value: string) => void;
}

const StringDropdownComponent: React.FC<StringDropdownComponentProps> = ({
  items,
  label,
  onSelectionChange,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set<string>([items[0]]),
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
    onSelectionChange(Array.from(keys).join(', '));
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
