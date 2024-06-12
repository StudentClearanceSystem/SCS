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
  });

  const [rows, setRows] = useState([{ key: 'initial', ...formData }]);

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [name]: value };
      return updatedRows;
    });
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { key: `row-${prevRows.length}`, ...formData },
    ]);
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
        `User added successfully!\nID: ${row.id}\nFirst Name: ${row.firstName}\nLast Name: ${row.lastName}\nMiddle Name: ${row.middleName}`,
      );
    });

    // Reset form fields
    setRows([
      { key: 'initial', id: '', firstName: '', lastName: '', middleName: '' },
    ]);
  };

  const handleCancel = () => {
    // Reset form fields on cancel
    setRows([
      { key: 'initial', id: '', firstName: '', lastName: '', middleName: '' },
    ]);
    setErrorMessage('');
  };

  const columns = [
    { key: 'id', label: 'ID (11 digits)' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'middleName', label: 'Middle Name' },
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
                  {(columnKey) => (
                    <TableCell>
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
                  )}
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
