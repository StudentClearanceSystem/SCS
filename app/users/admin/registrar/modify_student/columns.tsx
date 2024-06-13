import { Tooltip } from '@nextui-org/react';
import { TrashIcon } from '@heroicons/react/24/outline';
export type student = {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
};

export const columns = [
  { name: 'STUDENT NO.', uid: 'studentno', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PROGRAM', uid: 'program', sortable: true },
  { name: 'YEAR', uid: 'year', sortable: true },
  { name: 'SECTION', uid: 'section', sortable: true },
  {
    name: 'ACTION',
    uid: 'edit_students',
    sortable: false,
  },
];

export const renderCell = (
  students: student,
  columnKey: React.Key,
  deleteStudentHandler: (Student: student) => void, // Function to handle deletion
) => {
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
    case 'year':
    case 'section':
      return (
        <div className="flex flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'edit_students':
      return (
        <>
          <Tooltip color="danger" content={`Delete "${students.name}"`}>
            <span
              className="flex cursor-pointer justify-center text-sm text-danger active:opacity-50"
              onClick={() => deleteStudentHandler(students)}
            >
              <TrashIcon className="h-5 w-5" />
            </span>
          </Tooltip>
        </>
      );
    default:
      return cellValue;
  }
};
