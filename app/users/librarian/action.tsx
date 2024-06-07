import { supabase } from '@/app/lib/supabase';

export interface StudentDetailsLibrarian {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_librarian_cleared: boolean;
  librarian_remarks: string;
}

export const updateLibrarianStatus = async (
  studentDetails: StudentDetailsLibrarian,
) => {
  const { studentno, name, program, year, section, is_librarian_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetailsLibrarian> = { is_librarian_cleared };

  // If the librarian is cleared, set librarian_remarks to an empty string
  if (is_librarian_cleared) {
    updateData.librarian_remarks = '';
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating librarian status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Librarian Cleared: ${is_librarian_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateLibrarianRemarks = async (
  studentDetails: StudentDetailsLibrarian,
) => {
  const {
    studentno,
    name,
    program,
    year,
    section,
    is_librarian_cleared,
    librarian_remarks,
  } = studentDetails;

  // Update the librarian_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ librarian_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating librarian remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Librarian Cleared: ${is_librarian_cleared ? 'Yes' : 'No'}
    Remarks: ${librarian_remarks}`);
  }
};
