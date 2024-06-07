import { supabase } from '@/app/lib/supabase';

export interface StudentDetailsPurchasing {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_purchasing_cleared: boolean;
  purchasing_remarks: string;
}

export const updatePurchasingStatus = async (
  studentDetails: StudentDetailsPurchasing,
) => {
  const { studentno, name, program, year, section, is_purchasing_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetailsPurchasing> = { is_purchasing_cleared };

  // If the purchasing is cleared, set purchasing_remarks to an empty string
  if (is_purchasing_cleared) {
    updateData.purchasing_remarks = '';
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating purchasing status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Purchasing Cleared: ${is_purchasing_cleared ? 'Yes' : 'No'}`);
  }
};

export const updatePurchasingRemarks = async (
  studentDetails: StudentDetailsPurchasing,
) => {
  const {
    studentno,
    name,
    program,
    year,
    section,
    is_purchasing_cleared,
    purchasing_remarks,
  } = studentDetails;

  // Update the purchasing_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ purchasing_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating purchasing remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Purchasing Cleared: ${is_purchasing_cleared ? 'Yes' : 'No'}
    Remarks: ${purchasing_remarks}`);
  }
};
