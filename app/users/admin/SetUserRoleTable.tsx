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
  Button,
  Pagination,
  SortDescriptor,
} from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { user, columns, renderCell } from './columns';

export default function SetUserRoleTable({ users }: { users: user[] }) {
  const [filterValue, setFilterValue] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    }

    return filteredUsers;
  }, [users, hasSearchFilter, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: user, b: user) => {
      const first = a[sortDescriptor.column as keyof user];
      const second = b[sortDescriptor.column as keyof user];

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
    // Filtered users based on the search input
    const filteredUsers = users.filter((user) => {
      const searchValue = filterValue.toLowerCase();
      return (
        user.id.toString().includes(searchValue) ||
        user.name.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
      );
    });

    // Determine the count to display
    const displayedUserCount = filterValue
      ? filteredUsers.length
      : users.length;

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
              placeholder="Search by ID, Name, Role, or Email..."
              size="sm"
              startContent={
                <MagnifyingGlassIcon className=" h-5 w-5 text-default-400" />
              }
              value={filterValue}
              onClear={() => setFilterValue('')}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="flex gap-1">
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon className="h-5 w-5 text-white" />}
              size="sm"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-tiny text-default-400">
            Total {displayedUserCount} users
          </span>
          <label className="flex items-center text-tiny text-default-400">
            Rows per page:
            <select
              className=" border-none bg-transparent text-tiny text-default-400 outline-none"
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
  }, [filterValue, onRowsPerPageChange, onSearchChange, users]);

  return (
    <Table
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
      isHeaderSticky
      className="pb-8"
      isStriped
      aria-label="Users table"
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
            className="cursor-pointer hover:bg-gray-200"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}