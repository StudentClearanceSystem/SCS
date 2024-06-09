'use client';
import React from 'react';

/**
 * Interface representing the props for the RowsPerPageSelect component.
 */
interface RowsPerPageSelectProps {
  /**
   * Callback function to handle changes to the rows per page select element.
   *
   * @param e - The change event object.
   */
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * The RowsPerPageSelect component, allowing users to select the number of rows to display per page.
 *
 * @param onRowsPerPageChange - The callback function to handle changes to the rows per page select element.
 */
const RowsPerPageSelect: React.FC<RowsPerPageSelectProps> = ({
  onRowsPerPageChange,
}) => {
  return (
    <label className="flex items-center space-x-0.5 text-tiny text-default-400">
      Rows per page:
      <select
        className="border-none bg-transparent pr-6 text-xs text-default-400 outline-none"
        /**
         * Handle changes to the select element by calling the onRowsPerPageChange callback function.
         */
        onChange={onRowsPerPageChange}
      >
        <option value="10">10</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </label>
  );
};

export default RowsPerPageSelect;
