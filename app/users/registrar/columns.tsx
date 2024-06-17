import ActionCell from './ActionCell'; // Adjust the import path as needed
import { StudentDetailsRegistrar } from './action'; // Import the StudentDetails type

export type student = {
  studentno: string;
  name: string;
  program: string;
  sy_term: string;
  is_registrar_cleared: boolean; // Add this line
  registrar_remarks: string; // Add this line
};

export const columns = [
  { name: 'STUDENT NO.', uid: 'studentno', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PROGRAM', uid: 'program', sortable: true },
  { name: 'YEAR/TERM', uid: 'sy_term', sortable: true },
  {
    name: 'Registrar is cleared?',
    uid: 'is_registrar_cleared',
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
    case 'sy_term':
      return (
        <div className="flex min-w-[20px] max-w-[30px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'is_registrar_cleared':
      return (
        <div className="flex justify-center">
          <ActionCell
            registrarRemarks={students.registrar_remarks}
            isRegistrarCleared={students.is_registrar_cleared} // Pass the is_registrar_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as unknown as StudentDetailsRegistrar} // Pass the entire student object as studentDetails
          />
        </div>
      );
    default:
      return cellValue;
  }
};
