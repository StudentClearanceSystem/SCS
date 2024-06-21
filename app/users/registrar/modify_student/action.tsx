import { supabase } from '@/app/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export interface StudentDetailsRegistrar {
  studentno: string;
  name: string;
  program: string;
  sy_term: string;
  is_registrar_cleared: boolean;
  registrar_remarks: string | null;
}

export const insertStudentData = async (
  studentData: Omit<
    StudentDetailsRegistrar,
    'is_registrar_cleared' | 'registrar_remarks'
  >,
) => {
  try {
    const { data, error } = await supabase.from('table_students').insert({
      studentno: studentData.studentno,
      name: studentData.name,
      program: studentData.program,
      sy_term: studentData.sy_term,
      is_cashier_cleared: true,
      is_discipline_cleared: true,
      is_guidance_cleared: true,
      is_librarian_cleared: true,
      is_mis_cleared: true,
      is_programhead_cleared: true,
      is_purchasing_cleared: true,
      is_registrar_cleared: true,
      cashier_remarks: null,
      discipline_remarks: null,
      guidance_remarks: null,
      librarian_remarks: null,
      mis_remarks: null,
      programhead_remarks: null,
      purchasing_remarks: null,
      registrar_remarks: null,
    });

    if (error) {
      handleInsertError(error);
    }

    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
};

const handleInsertError = (error: PostgrestError) => {
  if (error.code === '23505') {
    // Unique violation error code in PostgreSQL
    console.error('Error inserting data: studentno already exists', error);
    throw new Error('Student number already exists.');
  } else {
    console.error('Error inserting data:', error);
    throw new Error(
      'Error inserting data. Please check your input and try again.',
    );
  }
};

export const deleteStudent = async (studentno: string) => {
  // Fetch student data before deletion
  const { data: studentData, error: fetchError } = await supabase
    .from('table_students')
    .select('name')
    .eq('studentno', studentno)
    .single(); // Use single() to get a single record

  if (fetchError) {
    console.error(`Error fetching student: ${studentno}`, fetchError);
    throw fetchError;
  }

  const studentName = studentData?.name;

  // Proceed to delete the student
  const { data, error } = await supabase
    .from('table_students')
    .delete()
    .eq('studentno', studentno);

  if (error) {
    console.error(`Error deleting student: ${studentno}`, error);
    throw error;
  }

  console.log(`Student deleted: ${studentno} (${studentName})`, data);
  alert(`Student deleted: ${studentno} (${studentName})`);
  return data;
};

export const deleteStudentsBySyTerm = async (sy_term: string) => {
  try {
    // Fetch student data before deletion for logging purposes
    const { data: studentsData, error: fetchError } = await supabase
      .from('table_students')
      .select('studentno, name')
      .eq('sy_term', sy_term);

    if (fetchError) {
      console.error(
        `Error fetching students for Sy/Term ${sy_term}`,
        fetchError,
      );
      throw fetchError;
    }

    const deletedStudents = studentsData?.map((student) => ({
      studentno: student.studentno,
      name: student.name,
    }));

    // Proceed to delete all students for the specified Sy/Term
    const { data, error } = await supabase
      .from('table_students')
      .delete()
      .eq('sy_term', sy_term);

    if (error) {
      console.error(`Error deleting students for Sy/Term ${sy_term}`, error);
      throw error;
    }

    console.log(`Deleted students for Sy/Term ${sy_term}:`, deletedStudents);
    alert(`Deleted students for Sy/Term ${sy_term}`);

    return data;
  } catch (error) {
    console.error('Failed to delete students by Sy/Term:', error);
    throw error;
  }
};
