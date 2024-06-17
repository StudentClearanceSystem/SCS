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
import StringDropdownComponent from './StringDropdownComponent';
import NumberDropdownComponent from './NumberDropdownComponent';
import { insertStudentData } from './action';

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
    program: 'Select',
    sy_term: 0,
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

    // Save the changed value for future new rows
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleAddRow = () => {
    setRows((prevRows) => {
      return [
        ...prevRows,
        {
          key: `row-${prevRows.length}`,
          id: '',
          firstName: '',
          lastName: '',
          middleName: '',
          program: formData.program,
          sy_term: formData.sy_term,
        },
      ];
    });
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

    // Validate ID length and dropdown selections
    for (const row of rows) {
      if (row.id.length !== 11) {
        setErrorMessage('ID must be exactly 11 digits long for all rows');
        return;
      }

      switch (true) {
        case row.program === 'Select':
          setErrorMessage('Program is not selected.');
          return;
        case row.sy_term === 0:
          setErrorMessage('Year is not selected.');
          return;
        default:
          break;
      }
    }

    try {
      for (const row of rows) {
        const name = `${row.lastName} ${row.firstName} ${row.middleName}`;
        await insertStudentData({
          studentno: row.id,
          name: name.trim(),
          program: row.program,
          sy_term: row.sy_term,
        });

        // Alert for successful submission with details
        alert(
          `User added successfully!\nID: ${row.id}\nName: ${name}\nProgram: ${row.program}\nsy_term: ${row.sy_term}`,
        );
      }

      // Reset form fields after successful submission
      setRows([
        {
          key: 'initial',
          id: '',
          firstName: '',
          lastName: '',
          middleName: '',
          program: formData.program,
          sy_term: formData.sy_term,
        },
      ]);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Failed to submit data. Please try again.');
      }
    }
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
        program: 'Select',
        sy_term: 0,
      },
    ]);
    setErrorMessage('');
  };

  const columns = [
    { key: 'id', label: 'ID (11 digits)' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'firstName', label: 'First Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'program', label: 'Program' },
    { key: 'sy_term', label: 'sy_term' },
  ];

  return (
    <main className="flex h-screen flex-col items-center">
      <div className="w-full max-w-[100%] rounded-lg bg-gray-200 p-5 shadow-2xl">
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
                        'Select',
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
                            selectedValue={row.program}
                          />
                        </TableCell>
                      );
                    } else if (columnKey === 'sy_term') {
                      const items =
                        columnKey === 'sy_term' ? [2301, 2302, 2401, 2402] : [];
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
                            selectedValue={row[columnKey]}
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
            <Button
              size="sm"
              type="button"
              className="btn-secondary text-black"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
