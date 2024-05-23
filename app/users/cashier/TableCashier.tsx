'use client';
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  SortDescriptor,
} from '@nextui-org/react';
import { student, columns, renderCell } from './columns';

export default function SetCashierTable({ students }: { students: student[] }) {
  const [filterValue, setFilterValue] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'studentno',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

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
      const first = a[sortDescriptor.column as keyof student];
      const second = b[sortDescriptor.column as keyof student];

      let cmp = 0;

      if (sortDescriptor.column === 'id') {
        cmp = Number(first) - Number(second);
      } else {
        cmp =
          typeof first === 'number' && typeof second === 'number'
            ? first - second
            : String(first).localeCompare(String(second));
      }

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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

  const topContent = React.useMemo(() => {
    // Filtered students based on the search input
    const filteredUsers = students.filter((student) => {
      // const searchValue = filterValue.toLowerCase();
      // return (
      //   student.studentNo.toString().includes(searchValue) ||
      //   student.name.toLowerCase().includes(searchValue) ||
      //   student.program.toLowerCase().includes(searchValue) ||
      //   student.year.toLowerCase().includes(searchValue)
      // );
    });

    // Determine the count to display
    const displayedUserCount = filterValue
      ? filteredUsers.length
      : students.length;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-end justify-between gap-3">
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
          <div className="flex gap-1"></div>
        </div>
        <div className="flex items-center gap-4 ">
          <span className="text-tiny text-default-400">
            Total {displayedUserCount} students
          </span>
          <label className="flex items-center space-x-0.5 text-tiny text-default-400">
            Rows per page:
            <select
              className=" border-none bg-transparent pr-6 text-xs text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="35">35</option>
              <option value="45">45</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onRowsPerPageChange, onSearchChange, students]);

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
}
