'use client';
import React from 'react';
import { Input } from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchInputProps {
  filterValue: string;
  onSearchChange: (value?: string) => void;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  filterValue,
  onSearchChange,
  setFilterValue,
}) => {
  return (
    <div className="flex w-full items-center gap-2 sm:max-w-[75%]">
      <Input
        isClearable
        classNames={{
          input: 'border-none',
          base: 'w-full',
        }}
        placeholder="Search..."
        size="sm"
        startContent={
          <MagnifyingGlassIcon className=" h-5 w-5 text-default-400" />
        }
        value={filterValue}
        onClear={() => setFilterValue('')}
        onValueChange={onSearchChange}
      />
    </div>
  );
};

export default SearchInput;
