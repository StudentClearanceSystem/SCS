import React from 'react';
import { student } from './columns';
import RowsPerPageSelect from '@/app/components/RowsPerPageSelect';
import SearchInput from '@/app/components/SearchInput';
import Dropdown from '@/app/components/Dropdown';
import { deleteStudentsBySyTerm } from './action';
import { Button } from '@nextui-org/react';

interface TableTopContentProps {
  students: student[];
  filterValue: string;
  filterProgram: string;
  filterYear_Term: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  setFilterProgram: React.Dispatch<React.SetStateAction<string>>;
  setFilterYear_Term: React.Dispatch<React.SetStateAction<string>>;
  onSearchChange: (value?: string) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TableTopContent: React.FC<TableTopContentProps> = ({
  students,
  filterValue,
  filterProgram,
  filterYear_Term,
  setFilterValue,
  setFilterProgram,
  setFilterYear_Term,
  onSearchChange,
  onRowsPerPageChange,
}) => {
  const displayedUserCount = students.filter((student) => {
    const searchValue = filterValue.toLowerCase();

    const matchesSearchFilter =
      !filterValue ||
      student.studentno.toString().includes(searchValue) ||
      student.name.toLowerCase().includes(searchValue) ||
      student.program.toLowerCase().includes(searchValue) ||
      student.sy_term.toString().toLowerCase().includes(searchValue);

    const matchesProgramFilter =
      !filterProgram || student.program === filterProgram;
    const matchesYearFilter =
      !filterYear_Term || String(student.sy_term) === filterYear_Term;

    return matchesSearchFilter && matchesProgramFilter && matchesYearFilter;
  }).length;

  const handleDeleteStudents = async () => {
    if (!filterYear_Term) {
      alert('Please select a Sy/Term to delete students');
      return;
    }

    const confirmation = window.confirm(
      `Are you sure you want to delete all students from Sy/Term ${filterYear_Term}?`,
    );

    if (!confirmation) {
      return; // Exit the function if the user cancels the deletion
    }

    try {
      await deleteStudentsBySyTerm(filterYear_Term);
      alert(`Students from Sy/Term ${filterYear_Term} have been deleted.`);
      setFilterYear_Term('');
      // Optionally, you can update the students state or refetch the students data here
    } catch (error) {
      console.error('Failed to delete students:', error);
      alert('Failed to delete students. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end justify-between gap-3">
        <SearchInput
          filterValue={filterValue}
          onSearchChange={onSearchChange}
          setFilterValue={setFilterValue}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-tiny text-default-400">
          Total {displayedUserCount} students
        </span>
        <RowsPerPageSelect onRowsPerPageChange={onRowsPerPageChange} />

        <div className="flex gap-5">
          {/* Dropdown for Program */}
          <Dropdown
            label="Program"
            options={getUniqueValues(students, 'program')}
            onSelect={(selectedProgram) => {
              setFilterProgram(selectedProgram);
            }}
          />
          {/* Dropdown for Sy/Term */}
          <Dropdown
            label="Sy/Term"
            options={getUniqueValues(students, 'sy_term')}
            onSelect={(selectedYear_Term) => {
              setFilterYear_Term(selectedYear_Term);
            }}
          />
          {/* Delete Students Button */}
          <Button
            size="sm"
            type="button"
            className=" mt-1 bg-danger px-1.5 py-1 text-[11px] text-background"
            onClick={handleDeleteStudents}
          >
            Delete per Sy/Term
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableTopContent;

const getUniqueValues = (students: student[], column: keyof student) => {
  const uniqueValues = Array.from(
    new Set(students.map((student) => student[column])),
  ).map((value) => {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'boolean') {
      return String(value);
    } else if (Number.isInteger(value)) {
      return String(value);
    } else {
      return '';
    }
  });

  // Sort the unique values in ascending order
  uniqueValues.sort((a, b) => a.localeCompare(b));

  return uniqueValues;
};
