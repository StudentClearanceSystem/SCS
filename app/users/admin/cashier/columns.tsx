import React from 'react';
import ActionCell from './ActionCell'; // Adjust the import path as needed
import { StudentDetailsCashier } from './action'; // Import the StudentDetails type

export type student = {
  studentno: string;
  name: string;
  program: string;
  sy_term: string;

  is_cashier_cleared: boolean; // Add this line
  cashier_remarks: string; // Add this line
};

export const columns = [
  { name: 'STUDENT NO.', uid: 'studentno', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PROGRAM', uid: 'program', sortable: true },
  { name: 'YEAR/TERM', uid: 'sy_term', sortable: true },
  { name: 'Cashier is cleared?', uid: 'is_cashier_cleared', sortable: false },
];

export const renderCell = (students: student, columnKey: React.Key) => {
  const cellValue = students[columnKey as keyof student];

  switch (columnKey) {
    case 'studentno':
      return (
        <div className="flex flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'name':
      return (
        <div className="flex flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'program':
      return (
        <div className="flex flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'sy_term':
      return (
        <div className="flex flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'is_cashier_cleared':
      return (
        <div className="flex justify-center">
          <ActionCell
            cashierRemarks={students.cashier_remarks}
            isCashierCleared={students.is_cashier_cleared} // Pass the is_cashier_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsCashier} // Pass the entire student object as studentDetails
          />
        </div>
      );
    default:
      return cellValue;
  }
};
