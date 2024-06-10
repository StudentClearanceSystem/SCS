'use client';
import React, { useEffect, useState } from 'react';
import { student } from './columns';
import { SortDescriptor } from '@nextui-org/react';
import TableTopContent from './TableTopContent';
import StudentTable from './StudentTable';
import { fetchDataAndListenForUpdates } from '@/app/lib/utils';

interface SetLibrarianTableProps {
  students: student[];
}

const SetLibrarianTable: React.FC<SetLibrarianTableProps> = ({ students }) => {
  const [filterValue, setFilterValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);
  const [studentData, setStudentData] = useState<student[]>(students);

  useEffect(() => {
    fetchDataAndListenForUpdates(setStudentData);
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(
    () => (
      <TableTopContent
        students={studentData}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        onSearchChange={onSearchChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    ),
    [filterValue, onRowsPerPageChange, onSearchChange, studentData],
  );

  return (
    <StudentTable
      students={studentData}
      filterValue={filterValue}
      rowsPerPage={rowsPerPage}
      sortDescriptor={sortDescriptor}
      page={page}
      setSortDescriptor={setSortDescriptor}
      setPage={setPage}
      topContent={topContent}
    />
  );
};

export default SetLibrarianTable;
