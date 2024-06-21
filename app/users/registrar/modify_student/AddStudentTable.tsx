'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { insertStudentData } from './action';

// Define the type for row data
type RowData = {
  key: string;
  id: string;
  name: string;
  program: string;
  sy_term: string;
  // Define optional properties for Excel headers
  'Student ID'?: string;
  'Student Name'?: string;
  'Program/s'?: string;
  'Sy & Term'?: string;
};

export default function AddStudentTable() {
  // Style
  const inputStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  // State for form data and rows
  const [formData, setFormData] = useState<RowData>({
    key: 'initial',
    id: '',
    name: '',
    program: '',
    sy_term: '',
  });

  const [rows, setRows] = useState<RowData[]>([formData]);
  const [excelData, setExcelData] = useState<RowData[]>([]); // State to store the data from the Excel file
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [name]: value } as RowData;
      return updatedRows;
    });
  };

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        key: `row-${prevRows.length}`,
        id: '',
        name: '',
        program: formData.program,
        sy_term: formData.sy_term,
      },
    ]);
  };

  const handleDeleteRow = () => {
    setRows((prevRows) => {
      if (prevRows.length === 1) return prevRows; // Prevent deleting the last row
      return prevRows.slice(0, -1);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Define the expected headers in the Excel file
        const expectedHeaders = [
          'Student ID', // Column to be mapped to 'id'
          'Student Name', // Column to be mapped to 'name'
          'Program/s', // Column to be mapped to 'program'
          'Sy & Term', // Column to be mapped to 'sy_term'
        ];

        // Read the Excel data and convert to JSON
        const jsonData: RowData[] = XLSX.utils.sheet_to_json<RowData>(
          worksheet,
          {
            header: expectedHeaders, // Use the expected headers
            range: 9, // Skip the first row if it contains headers
          },
        );

        // Map the JSON data to your desired format
        const formattedData = jsonData.map((row, index) => ({
          key: `row-${index}`, // Unique key for each row
          id: row['Student ID'] || '', // Map 'Student ID' to 'id'
          name: row['Student Name'] || '', // Map 'Student Name' to 'name'
          program: row['Program/s'] || '', // Map 'Program/s' to 'program'
          sy_term: row['Sy & Term'] || '', // Map 'Sy & Term' to 'sy_term'
        }));

        console.log(formattedData); // For debugging purposes
        setExcelData(formattedData); // Update state with formatted data
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate ID length and dropdown selections
    for (const row of rows) {
      if (row.id.length !== 10) {
        setErrorMessage('ID must be exactly 10 digits long for all rows');
        return;
      }

      if (row.program === 'Select') {
        setErrorMessage('Program is not selected.');
        return;
      }

      if (row.sy_term === '0') {
        setErrorMessage('Year is not selected.');
        return;
      }
    }

    try {
      for (const row of rows) {
        await insertStudentData({
          studentno: row.id.trim(),
          name: row.name,
          program: row.program,
          sy_term: row.sy_term,
        });

        // Alert for successful submission with details
        alert(
          `User added successfully!\nID: ${row.id}\nName: ${row.name}\nProgram: ${row.program}\nsy_term: ${row.sy_term}`,
        );
      }

      // Reset form fields after successful submission
      setRows([
        {
          key: 'initial',
          id: '',
          name: '',
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

  const handleExcelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      for (const row of excelData) {
        await insertStudentData({
          studentno: row.id,
          name: row.name,
          program: row.program,
          sy_term: row.sy_term,
        });
      }
      // Display alert after successful submission of all data
      alert(
        'All students from the scanned Excel data have been successfully uploaded.',
      );
      // Reset Excel data after successful submission
      setExcelData([]);
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
        name: '',
        program: '',
        sy_term: '',
      },
    ]);
    setExcelData([]); // Clear the scanned Excel data on cancel
    setErrorMessage('');
  };

  const columns = [
    { key: 'id', label: 'ID (10 digits)' },
    { key: 'name', label: 'NAME' },
    { key: 'program', label: 'PROGAM' },
    { key: 'sy_term', label: 'Sy & Term' },
  ];

  return (
    <main className="flex h-full flex-col items-center bg-blue-bg pb-10">
      <div className="w-full max-w-[100%] rounded-lg bg-gray-200 p-10 shadow-2xl">
        <h2 className="mb-8 text-lg font-bold sm:text-[8px] md:text-base lg:text-lg">
          ADD STUDENT
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 sm:text-[8px] md:text-base lg:text-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Table aria-label="Add student table">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={row.key}>
                  {columns.map((column) => {
                    const columnKey = column.key as keyof RowData;

                    // Replace StringDropdownComponent for 'program' with Input component
                    if (columnKey === 'program') {
                      return (
                        <TableCell key={columnKey}>
                          <Input
                            labelPlacement="outside"
                            name={String(columnKey)}
                            label={String(columnKey)}
                            value={String(row[columnKey])}
                            onChange={(e) => handleChange(e, rowIndex)}
                            isRequired
                            style={inputStyle}
                            size="sm"
                          />{' '}
                          {/* Use Input component for 'program' */}
                        </TableCell>
                      );
                    }

                    // Replace NumberDropdownComponent for 'sy_term' with Input component
                    else if (columnKey === 'sy_term') {
                      return (
                        <TableCell key={columnKey}>
                          <Input
                            labelPlacement="outside"
                            name={String(columnKey)}
                            label={String(columnKey)}
                            value={String(row[columnKey])}
                            onChange={(e) => handleChange(e, rowIndex)}
                            isRequired
                            style={inputStyle}
                            size="sm"
                          />{' '}
                          {/* Use Input component for 'sy_term' */}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={columnKey}>
                        <Input
                          labelPlacement="outside"
                          name={String(columnKey)}
                          label={String(columnKey)}
                          value={String(row[columnKey])}
                          onChange={(e) => handleChange(e, rowIndex)}
                          isRequired
                          style={inputStyle}
                          size="sm"
                          minLength={columnKey === 'id' ? 10 : undefined}
                          maxLength={columnKey === 'id' ? 10 : undefined}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-end">
            <div className="space-x-3">
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
          </div>
        </form>
      </div>

      {/* Display the Excel data */}
      <div className="p12 m-12 flex w-full flex-col items-center justify-center rounded-lg bg-gray-200 shadow-2xl">
        <div className=" flex flex-row items-start">
          <h3 className=" items-start pt-5">Upload excel file here:</h3>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="p-4 text-left"
          />
        </div>
        {excelData.length > 0 && (
          <div className="w-full max-w-[100%] rounded-lg p-5 ">
            <div>
              <h2 className=" text-lg font-bold sm:text-[8px] md:text-base lg:text-lg">
                Scanned Excel Data
              </h2>
              <div className="mb-4 flex justify-end space-x-3">
                <Button
                  size="sm"
                  type="button"
                  className="bg-primary text-background"
                  onClick={handleExcelSubmit}
                >
                  Submit All
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
            </div>

            <Table aria-label="Scanned Excel data table">
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {excelData.map((row, index) => (
                  <TableRow key={`excel-${index}`}>
                    {columns.map((column) => (
                      <TableCell key={`${column.key}-${index}`}>
                        {row[column.key as keyof RowData]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
}
