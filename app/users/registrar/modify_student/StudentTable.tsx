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
import { deleteStudent } from './action'; // Import the deleteStudent function

interface StudentTableProps {
  students: student[];
  filterValue: string;
  filterProgram: string;
  filterYear: string;
  filterSection: string;
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
  filterYear,
  filterSection,
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
  const hasYearFilter = Boolean(filterYear);
  const hasSectionFilter = Boolean(filterSection);

  const deleteStudentHandler = async (Student: student) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently DELETE student \n Name: ${Student.name}? \n Number: ${Student.studentno}\n Program: ${Student.program}\n Section: ${Student.section} \n Year: ${Student.year} `,
    );
    if (confirmed) {
      try {
        await deleteStudent(Student.studentno);
        // Optionally, update the local state to remove the deleted student
        // This assumes you have a way to update the parent state or refetch the data
      } catch (error) {
        alert(
          `Failed to delete student with student number ${Student.studentno}.`,
        );
      }
    }
  };

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

    if (hasYearFilter) {
      filteredUsers = filteredUsers.filter(
        (student) => String(student.year) === filterYear,
      );
    }

    if (hasSectionFilter) {
      filteredUsers = filteredUsers.filter(
        (student) => String(student.section) === filterSection,
      );
    }

    return filteredUsers;
  }, [
    students,
    hasSearchFilter,
    filterValue,
    hasProgramFilter,
    filterProgram,
    hasYearFilter,
    filterYear,
    hasSectionFilter,
    filterSection,
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
            className="cursor-pointer justify-center text-center hover:bg-gray-200"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={'No students found'} items={paginatedItems}>
        {(item) => (
          <TableRow key={item.studentno}>
            {(columnKey) => (
              <TableCell className="border-1 text-center">
                {renderCell(item, columnKey, deleteStudentHandler)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
