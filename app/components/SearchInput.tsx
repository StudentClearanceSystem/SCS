'use client';
import React from 'react';
import { Input } from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * Interface representing the props for the SearchInput component.
 */
interface SearchInputProps {
  /**
   * The current filter value.
   */
  filterValue: string;
  /**
   * Callback function to handle changes to the search input.
   *
   * @param value - The new filter value.
   */
  onSearchChange: (value?: string) => void;
  /**
   * Setter function to update the filter value.
   *
   * @param value - The new filter value.
   */
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * The SearchInput component, allowing users to input search queries.
 *
 * @param filterValue - The current filter value.
 * @param onSearchChange - Callback function to handle changes to the search input.
 * @param setFilterValue - Setter function to update the filter value.
 */
const SearchInput: React.FC<SearchInputProps> = ({
  filterValue,
  onSearchChange,
  setFilterValue,
}) => {
  return (
    <div className="flex w-full items-center gap-2 sm:max-w-[75%]">
      <Input
        /**
         * Allow the input to be cleared.
         */
        isClearable
        /**
         * Custom class names for the input component.
         */
        classNames={{
          input: 'border-none',
          base: 'w-full',
        }}
        /**
         * Placeholder text for the input field.
         */
        placeholder="Search..."
        /**
         * Size of the input field.
         */
        size="sm"
        /**
         * Icon to display at the start of the input field.
         */
        startContent={
          <MagnifyingGlassIcon className="h-5 w-5 text-default-400" />
        }
        /**
         * Current value of the input field.
         */
        value={filterValue}
        /**
         * Callback function to handle clearing of the input field.
         */
        onClear={() => setFilterValue('')}
        /**
         * Callback function to handle changes to the input field.
         */
        onValueChange={onSearchChange}
      />
    </div>
  );
};

export default SearchInput;
