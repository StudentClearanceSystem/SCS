'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
import { user, columns, renderCell } from './columns';
import { AddNewUser } from './components/buttons';
import {
  deleteUser,
  fetchDataAndListenForUpdatesForUserRole,
} from '@/app/lib/utils';

export default function SetUserRoleTable({
  initialUsers = [],
}: {
  initialUsers: user[];
}) {
  const [users, setUsers] = useState<user[]>(initialUsers);
  const [filterValue, setFilterValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDataAndListenForUpdatesForUserRole(setUsers);
  }, []);

  const pages = Math.ceil(users.length / rowsPerPage);

  const handleDeleteUser = async (userEmail: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove user: ${userEmail}?`,
    );
    if (confirmed) {
      const success = await deleteUser(userEmail);
      if (success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== userEmail),
        );
      }
    }
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
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

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
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

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || '');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    const displayedUserCount = filteredItems.length;
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-end justify-between gap-3">
          <div className="flex w-full items-center gap-2">
            <Input
              isClearable
              classNames={{ input: 'border-none', base: 'w-full' }}
              placeholder="Search..."
              size="sm"
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-default-400" />
              }
              value={filterValue}
              onClear={() => setFilterValue('')}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="flex gap-1">
            <AddNewUser />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-tiny text-default-400">
            Total {displayedUserCount} users
          </span>
          <label className="flex items-center space-x-0.5 text-tiny text-default-400">
            Rows per page:
            <select
              className="border-none bg-transparent pr-6 text-xs text-default-400 outline-none"
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
  }, [filteredItems.length, filterValue, onRowsPerPageChange, onSearchChange]);

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
            className="cursor-pointer text-center hover:bg-gray-200"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="border-1 text-center">
                {renderCell(item, columnKey, handleDeleteUser)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
