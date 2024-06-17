'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  SortDescriptor,
} from '@nextui-org/react';
import { student, columns, renderCell } from './columns';

interface StudentTableProps {
  students: student[];
  filterValue: string;
  filterProgram: string;
  filterYear_Term: string;
  rowsPerPage: number;
  sortDescriptor: SortDescriptor;
  page: number;
  setSortDescriptor: React.Dispatch<React.SetStateAction<SortDescriptor>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  topContent: React.ReactNode;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  filterValue,
  filterProgram,
  filterYear_Term,
  rowsPerPage,
  sortDescriptor,
  page,
  setSortDescriptor,
  setPage,
  topContent,
}) => {
  const pages = Math.ceil(students.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);
  const hasProgramFilter = Boolean(filterProgram);
  const hasYear_TermFilter = Boolean(filterYear_Term);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...students];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((student) =>
        Object.values(student).some((value) =>
          String(value).toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    }

    if (hasProgramFilter) {
      filteredUsers = filteredUsers.filter(
        (student) => student.program === filterProgram,
      );
    }

    if (hasYear_TermFilter) {
      filteredUsers = filteredUsers.filter(
        (student) => String(student.sy_term) === filterYear_Term,
      );
    }
    return filteredUsers;
  }, [
    students,
    hasSearchFilter,
    hasProgramFilter,
    hasYear_TermFilter,
    filterValue,
    filterProgram,
    filterYear_Term,
  ]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: student, b: student) => {
      const first = a[sortDescriptor.column as keyof student];
      const second = b[sortDescriptor.column as keyof student];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  return (
    <Table
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
      isHeaderSticky
      className="pb-8"
      isStriped
      aria-label="Students table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      bottomContentPlacement="outside"
      topContent={topContent}
      topContentPlacement="inside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            allowsSorting={column.sortable}
            key={column.uid}
            className={`sticky cursor-pointer justify-center  text-center  ${
              column.uid === 'studentno'
                ? 'left-0 z-50'
                : column.uid === 'name'
                  ? 'left-[120px] z-50'
                  : ''
            }`}
            style={{ minWidth: '120px' }} // Adjust this width as needed
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={'No students found'} items={paginatedItems}>
        {(item) => (
          <TableRow key={item.studentno}>
            {(columnKey) => (
              <TableCell
                className={`border-1 text-center ${columnKey === 'studentno' ? 'sticky left-0 z-30 bg-white' : ''} ${columnKey === 'name' ? 'sticky left-[120px] z-30 bg-white' : ''}`}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
