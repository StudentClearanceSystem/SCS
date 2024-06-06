import { supabase } from '@/app/lib/supabase';

export interface StudentDetails {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_programhead_cleared: boolean;
  programhead_remarks: string;
}

export const updateProgramHeadStatus = async (
  studentDetails: StudentDetails,
) => {
  const { studentno, name, program, year, section, is_programhead_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetails> = { is_programhead_cleared };

  // If the programhead is cleared, set programhead_remarks to an empty string
  if (is_programhead_cleared) {
    updateData.programhead_remarks = '';
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating programhead status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    ProgramHead Cleared: ${is_programhead_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateProgramHeadRemarks = async (
  studentDetails: StudentDetails,
) => {
  const {
    studentno,
    name,
    program,
    year,
    section,
    is_programhead_cleared,
    programhead_remarks,
  } = studentDetails;

  // Update the programhead_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ programhead_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating programhead remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    ProgramHead Cleared: ${is_programhead_cleared ? 'Yes' : 'No'}
    Remarks: ${programhead_remarks}`);
  }
};
