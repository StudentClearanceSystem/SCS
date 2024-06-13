import React from 'react';
import ActionCell from './ActionCell'; // Adjust the import path as needed
import { StudentDetailsPurchasing } from './action'; // Import the StudentDetailsPurchasing type

export type student = {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_purchasing_cleared: boolean; // Add this line
  purchasing_remarks: string; // Add this line
};

export const columns = [
  { name: 'STUDENT NO.', uid: 'studentno', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PROGRAM', uid: 'program', sortable: true },
  { name: 'YEAR', uid: 'year', sortable: true },
  { name: 'SECTION', uid: 'section', sortable: true },
  {
    name: 'Purchasing is cleared?',
    uid: 'is_purchasing_cleared',
    sortable: false,
  },
];

export const renderCell = (students: student, columnKey: React.Key) => {
  const cellValue = students[columnKey as keyof student];

  switch (columnKey) {
    case 'studentno':
      return (
        <div className="flex min-w-[100px] max-w-[150px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'name':
      return (
        <div className="flex min-w-[150px] max-w-[300px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'program':
      return (
        <div className="flex min-w-[50px] max-w-[100px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'year':
      return (
        <div className="flex min-w-[20px] max-w-[30px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'section':
      return (
        <div className="flex min-w-[20px] max-w-[30px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'is_purchasing_cleared':
      return (
        <div className="flex justify-center">
          <ActionCell
            purchasingRemarks={students.purchasing_remarks}
            isPurchasingCleared={students.is_purchasing_cleared} // Pass the is_purchasing_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsPurchasing} // Pass the entire student object as studentDetails
          />
        </div>
      );
    default:
      return cellValue;
  }
};
