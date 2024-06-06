import { supabase } from '@/app/lib/supabase';

export interface StudentDetails {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_mis_cleared: boolean;
  mis_remarks: string;
}

export const updateMISStatus = async (studentDetails: StudentDetails) => {
  const { studentno, name, program, year, section, is_mis_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetails> = { is_mis_cleared };

  // If the mis is cleared, set mis_remarks to an empty string
  if (is_mis_cleared) {
    updateData.mis_remarks = '';
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating mis status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    MIS Cleared: ${is_mis_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateMISRemarks = async (studentDetails: StudentDetails) => {
  const {
    studentno,
    name,
    program,
    year,
    section,
    is_mis_cleared,
    mis_remarks,
  } = studentDetails;

  // Update the mis_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ mis_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating mis remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    MIS Cleared: ${is_mis_cleared ? 'Yes' : 'No'}
    Remarks: ${mis_remarks}`);
  }
};
