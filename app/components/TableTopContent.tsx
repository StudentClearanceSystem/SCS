'use client';
import React from 'react';
import SearchInput from './SearchInput';
import RowsPerPageSelect from './RowsPerPageSelect';
import { student } from '../users/cashier/columns';

interface TableTopContentProps {
  students: student[];
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  onSearchChange: (value?: string) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TableTopContent: React.FC<TableTopContentProps> = ({
  students,
  filterValue,
  setFilterValue,
  onSearchChange,
  onRowsPerPageChange,
}) => {
  const displayedUserCount = filterValue
    ? students.filter((student) => {
        const searchValue = filterValue.toLowerCase();
        return (
          student.studentno.toString().includes(searchValue) ||
          student.name.toLowerCase().includes(searchValue) ||
          student.program.toLowerCase().includes(searchValue) ||
          student.year.toString().toLowerCase().includes(searchValue)
        );
      }).length
    : students.length;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end justify-between gap-3">
        <SearchInput
          filterValue={filterValue}
          onSearchChange={onSearchChange}
          setFilterValue={setFilterValue}
        />
        <div className="flex gap-1"></div>
      </div>
      <div className="flex items-center gap-4 ">
        <span className="text-tiny text-default-400">
          Total {displayedUserCount} students
        </span>
        <RowsPerPageSelect onRowsPerPageChange={onRowsPerPageChange} />
      </div>
    </div>
  );
};

export default TableTopContent;
