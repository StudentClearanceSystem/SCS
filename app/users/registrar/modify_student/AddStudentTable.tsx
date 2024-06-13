'use client';
import { useState } from 'react';
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';
import Link from 'next/link';
import StringDropdownComponent from './StringDropdownComponent';
import NumberDropdownComponent from './NumberDropdownComponent';

export default function AddStudentTable() {
  // Style
  const inputStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  // State for form data and rows
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    program: 'ACT',
    year: 1,
    section: 101,
  });

  const [rows, setRows] = useState([{ key: 'initial', ...formData }]);

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [name]: value };
      return updatedRows;
    });
  };

  const handleDropdownChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [field]: value };
      return updatedRows;
    });
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { key: `row-${prevRows.length}`, ...formData },
    ]);
  };

  const handleDeleteRow = () => {
    setRows((prevRows) => {
      if (prevRows.length === 1) return prevRows; // Prevent deleting the last row
      return prevRows.slice(0, -1);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate ID length
    if (rows.some((row) => row.id.length !== 11)) {
      setErrorMessage('ID must be exactly 11 digits long for all rows');
      return;
    }

    // Output form data with alert after successful submission
    rows.forEach((row) => {
      alert(
        `User added successfully!\nID: ${row.id}\nFirst Name: ${row.firstName}\nLast Name: ${row.lastName}\nMiddle Name: ${row.middleName}\nProgram: ${row.program}\nYear: ${row.year}\nSection: ${row.section}`,
      );
    });

    // Reset form fields
    setRows([
      {
        key: 'initial',
        id: '',
        firstName: '',
        lastName: '',
        middleName: '',
        program: 'ACT',
        year: 1,
        section: 101,
      },
    ]);
  };

  const handleCancel = () => {
    // Reset form fields on cancel
    setRows([
      {
        key: 'initial',
        id: '',
        firstName: '',
        lastName: '',
        middleName: '',
        program: 'ACT',
        year: 1,
        section: 101,
      },
    ]);
    setErrorMessage('');
  };

  const columns = [
    { key: 'id', label: 'ID (11 digits)' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'program', label: 'Program' },
    { key: 'year', label: 'Year' },
    { key: 'section', label: 'Section' },
  ];

  return (
    <main className="flex h-screen flex-col items-center bg-[#C28FC2]">
      <div className="w-full max-w-[95%] rounded-lg bg-gray-200 p-5 shadow-2xl">
        <h2 className="mb-8 text-lg font-bold sm:text-[8px] md:text-base lg:text-lg">
          ADD STUDENT
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 sm:text-[8px] md:text-base lg:text-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Table aria-label="Example table with dynamic content">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={row.key}>
                  {(columnKey) => {
                    if (columnKey === 'program') {
                      const items = [
                        'ACT',
                        'ART',
                        'BACOMM',
                        'BAPsych',
                        'BSA',
                        'BSAIS',
                        'BSBA',
                        'BSCpE',
                        'BSCS',
                        'BSTM',
                        'BSRTCS',
                        'BSIT',
                      ];
                      return (
                        <TableCell key={columnKey}>
                          <StringDropdownComponent
                            items={items}
                            label="Program"
                            onSelectionChange={(value) =>
                              handleDropdownChange(rowIndex, columnKey, value)
                            }
                          />
                        </TableCell>
                      );
                    } else if (
                      columnKey === 'year' ||
                      columnKey === 'section'
                    ) {
                      const items =
                        columnKey === 'year'
                          ? [1, 2, 3, 4]
                          : [
                              101, 102, 103, 104, 201, 202, 203, 204, 301, 302,
                              303, 304, 401, 402, 403, 404, 501, 502, 503, 504,
                              601, 602, 603, 604, 701, 702, 703, 704,
                            ];
                      return (
                        <TableCell key={columnKey}>
                          <NumberDropdownComponent
                            items={items}
                            label={
                              columnKey.charAt(0).toUpperCase() +
                              columnKey.slice(1)
                            }
                            onSelectionChange={(value) =>
                              handleDropdownChange(rowIndex, columnKey, value)
                            }
                          />
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={columnKey}>
                        <Input
                          labelPlacement="outside"
                          name={String(columnKey)}
                          label={String(columnKey)}
                          value={String(getKeyValue(row, columnKey))}
                          onChange={(e) => handleChange(e, rowIndex)}
                          isRequired
                          style={inputStyle}
                          size="sm"
                          minLength={columnKey === 'id' ? 11 : undefined}
                          maxLength={columnKey === 'id' ? 11 : undefined}
                        />
                      </TableCell>
                    );
                  }}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end space-x-3">
            <Button
              size="sm"
              type="button"
              className="bg-primary text-background"
              onClick={handleAddRow}
            >
              Add Row
            </Button>
            <Button
              size="sm"
              type="button"
              className="bg-danger text-background"
              onClick={handleDeleteRow}
            >
              Delete Row
            </Button>
            <Button
              size="sm"
              type="submit"
              className="bg-primary text-background"
            >
              Submit
            </Button>
            <Link href="/users/registrar">
              <Button
                size="sm"
                type="button"
                className="btn-secondary text-black"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
