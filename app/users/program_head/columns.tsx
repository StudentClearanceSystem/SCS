import ActionCell from './ActionCell';
import ActionCellCashier from '@/app/users/cashier/ActionCell';
import ActionCellDisipline from '@/app/users/discipline/ActionCell';
import ActionCellGuidance from '@/app/users/guidance/ActionCell';
import ActionCellLibrarian from '@/app/users/librarian/ActionCell';
import ActionCellMIS from '@/app/users/mis/ActionCell';
import ActionCellProgramHead from '@/app/users/program_head/ActionCell';
import ActionCellPurchasing from '@/app/users/purchasing/ActionCell';
import ActionCellRegistrar from '@/app/users/registrar/ActionCell';

import { StudentDetails } from './action';
import { StudentDetailsCashier } from '../cashier/action';
import { StudentDetailsDiscipline } from '@/app/users/discipline/action';
import { StudentDetailsGuidance } from '@/app/users/guidance/action';
// import {StudentDetailsLibrarian} from '@/app/users/librarian/action';
// import {StudentDetailsMIS} from '@/app/users/mis/action';
// import {StudentDetailsProgramHead} from '@/app/users/program_head/action';
// import { StudentDetailsPurchasing } from '@/app/users/purchasing/action';
// import { StudentDetailsRegistrar } from '@/app/users/registrar/action';

// comments somthing

export type student = {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;

  is_programhead_cleared: boolean;
  programhead_remarks: string;

  is_cashier_cleared: boolean;
  cashier_remarks: string;

  is_discipline_cleared: boolean;
  discipline_remarks: string;

  is_guidance_cleared: boolean;
  guidance_remarks: string;

  is_librarian_cleared: boolean;
  librarian_remarks: string;

  is_mis_cleared: boolean;
  mis_remarks: string;

  is_purchasing_cleared: boolean;
  purchasing_remarks: string;

  is_registrar_cleared: boolean;
  registrar_remarks: string;
};

export const columns = [
  { name: 'STUDENT NO.', uid: 'studentno', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PROGRAM', uid: 'program', sortable: true },
  { name: 'YEAR', uid: 'year', sortable: true },
  { name: 'SECTION', uid: 'section', sortable: true },
  {
    name: 'ProgramHead is cleared?',
    uid: 'is_programhead_cleared',
    sortable: false,
  },
  {
    name: 'Cashier is cleared?',
    uid: 'is_cashier_cleared',
    sortable: false,
  },
  {
    name: 'Discipline is cleared?',
    uid: 'is_discipline_cleared',
    sortable: false,
  },
  {
    name: 'Guidance is cleared?',
    uid: 'is_guidance_cleared',
    sortable: false,
  },
  {
    name: 'Librarian is cleared?',
    uid: 'is_librarian_cleared',
    sortable: false,
  },
  {
    name: 'MIS is cleared?',
    uid: 'is_mis_cleared',
    sortable: false,
  },
  {
    name: 'Purchasing is cleared?',
    uid: 'is_purchasing_cleared',
    sortable: false,
  },
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
    case 'is_programhead_cleared':
      return (
        <div className="flex justify-center">
          <ActionCell
            programheadRemarks={students.programhead_remarks}
            isProgramHeadCleared={students.is_programhead_cleared} // Pass the is_programhead_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetails} // Pass the entire student object as studentDetails
          />
        </div>
      );
    case 'is_cashier_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellCashier
            cashierRemarks={students.cashier_remarks}
            isCashierCleared={students.is_cashier_cleared} // Pass the is_cashier_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsCashier} // Pass the entire student object as studentDetails
          />
        </div>
      );

    case 'is_discipline_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellDisipline
            disciplineRemarks={students.discipline_remarks}
            isDisciplineCleared={students.is_discipline_cleared} // Pass the is_discipline_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsDiscipline} // Pass the entire student object as studentDetails
          />
        </div>
      );
    case 'is_guidance_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellGuidance
            guidanceRemarks={students.guidance_remarks}
            isGuidanceCleared={students.is_guidance_cleared} // Pass the is_guidance_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsGuidance} // Pass the entire student object as studentDetails
          />
        </div>
      );

    default:
      return cellValue;
  }
};
