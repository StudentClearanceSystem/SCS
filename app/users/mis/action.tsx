import { supabase } from '@/app/lib/supabase';

export interface StudentDetailsMIS {
  studentno: string;
  name: string;
  program: string;
  sy_term: string;

  is_mis_cleared: boolean;
  mis_remarks: string | null;
}

export const updateMISStatus = async (studentDetails: StudentDetailsMIS) => {
  const { studentno, name, program, sy_term, is_mis_cleared } = studentDetails;

  let updateData: Partial<StudentDetailsMIS> = { is_mis_cleared };

  // If the mis is cleared, set mis_remarks to an empty string
  if (is_mis_cleared) {
    updateData.mis_remarks = null;
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
    Year_Term: ${sy_term}

    MIS Cleared: ${is_mis_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateMISRemarks = async (studentDetails: StudentDetailsMIS) => {
  const {
    studentno,
    name,
    program,
    sy_term,

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
    Year_Term: ${sy_term}
    MIS Cleared: ${is_mis_cleared ? 'Yes' : 'No'}
    Remarks: ${mis_remarks}`);
  }
};
