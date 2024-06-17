import ActionCellCashier from '@/app/users/admin/cashier/ActionCell';
import ActionCellDisipline from '@/app/users/admin/discipline/ActionCell';
import ActionCellGuidance from '@/app/users/admin/guidance/ActionCell';
import ActionCellLibrarian from '@/app/users/admin/librarian/ActionCell';
import ActionCellMIS from '@/app/users/admin/mis/ActionCell';
import ActionCellProgramHead from '@/app/users/admin/program_head/ActionCell';
import ActionCellPurchasing from '@/app/users/admin/purchasing/ActionCell';
import ActionCellRegistrar from '@/app/users/admin/registrar/ActionCell';

import { StudentDetailsCashier } from '@/app/users/admin/cashier/action';
import { StudentDetailsDiscipline } from '@/app/users/admin/discipline/action';
import { StudentDetailsGuidance } from '@/app/users/admin/guidance/action';
import { StudentDetailsLibrarian } from '@/app/users/admin/librarian/action';
import { StudentDetailsMIS } from '@/app/users/admin/mis/action';
import { StudentDetailsProgramHead } from './action';
import { StudentDetailsPurchasing } from '@/app/users/admin/purchasing/action';
import { StudentDetailsRegistrar } from '@/app/users/admin/registrar/action';
import React from 'react';

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
        <div className="flex w-[120px] flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'name':
      return (
        <div className="flex w-[130px] flex-col justify-center">
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
      return (
        <div className="flex flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'section':
      return (
        <div className="flex flex-col justify-center">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'is_programhead_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellProgramHead
            programheadRemarks={students.programhead_remarks}
            isProgramHeadCleared={students.is_programhead_cleared} // Pass the is_programhead_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsProgramHead} // Pass the entire student object as studentDetails
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

    case 'is_librarian_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellLibrarian
            librarianRemarks={students.librarian_remarks}
            isLibrarianCleared={students.is_librarian_cleared} // Pass the is_librarian_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsLibrarian} // Pass the entire student object as studentDetails
          />
        </div>
      );

    case 'is_mis_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellMIS
            misRemarks={students.mis_remarks}
            isMISCleared={students.is_mis_cleared} // Pass the is_mis_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsMIS} // Pass the entire student object as studentDetails
          />
        </div>
      );

    case 'is_purchasing_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellPurchasing
            purchasingRemarks={students.purchasing_remarks}
            isPurchasingCleared={students.is_purchasing_cleared} // Pass the is_purchasing_cleared value
            studentNo={students.studentno} // Pass the student number for identification
            studentDetails={students as StudentDetailsPurchasing} // Pass the entire student object as studentDetails
          />
        </div>
      );

    case 'is_registrar_cleared':
      return (
        <div className="flex justify-center">
          <ActionCellRegistrar
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
