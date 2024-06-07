'use client';
import React from 'react';

interface RowsPerPageSelectProps {
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RowsPerPageSelect: React.FC<RowsPerPageSelectProps> = ({
  onRowsPerPageChange,
}) => {
  return (
    <label className="flex items-center space-x-0.5 text-tiny text-default-400">
      Rows per page:
      <select
        className=" border-none bg-transparent pr-6 text-xs text-default-400 outline-none"
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
