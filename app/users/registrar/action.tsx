import { supabase } from '@/app/lib/supabase';

export interface StudentDetails {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_registrar_cleared: boolean;
  registrar_remarks: string;
}

export const updateRegistrarStatus = async (studentDetails: StudentDetails) => {
  const { studentno, name, program, year, section, is_registrar_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetails> = { is_registrar_cleared };

  // If the registrar is cleared, set registrar_remarks to an empty string
  if (is_registrar_cleared) {
    updateData.registrar_remarks = '';
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating registrar status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Registrar Cleared: ${is_registrar_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateRegistrarRemarks = async (
  studentDetails: StudentDetails,
) => {
  const {
    studentno,
    name,
    program,
    year,
    section,
    is_registrar_cleared,
    registrar_remarks,
  } = studentDetails;

  // Update the registrar_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ registrar_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating registrar remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Registrar Cleared: ${is_registrar_cleared ? 'Yes' : 'No'}
    Remarks: ${registrar_remarks}`);
  }
};
