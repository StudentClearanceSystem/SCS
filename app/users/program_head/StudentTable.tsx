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
  rowsPerPage,
  sortDescriptor,
  page,
  setSortDescriptor,
  setPage,
  topContent,
}) => {
  const pages = Math.ceil(students.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...students];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((student) =>
        Object.values(student).some((value) =>
          String(value).toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    }

    return filteredUsers;
  }, [students, hasSearchFilter, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: student, b: student) => {
      const first = a[
        sortDescriptor.column as keyof student
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof student
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  return (
    <Table
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
      isHeaderSticky
      className="pb-8 "
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
            className=" cursor-pointer justify-center text-center hover:bg-gray-200"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={'No students found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.studentno}>
            {(columnKey) => (
              <TableCell className=" border-1 text-center">
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
