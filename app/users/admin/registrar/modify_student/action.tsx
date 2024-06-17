import { supabase } from '@/app/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export interface StudentDetailsRegistrar {
  studentno: string;
  name: string;
  program: string;
  sy_term: number;
  is_registrar_cleared: boolean;
  registrar_remarks: string;
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
      is_cashier_cleared: false,
      is_discipline_cleared: false,
      is_guidance_cleared: false,
      is_librarian_cleared: false,
      is_mis_cleared: false,
      is_programhead_cleared: false,
      is_purchasing_cleared: false,
      is_registrar_cleared: false,
      cashier_remarks: '',
      discipline_remarks: '',
      guidance_remarks: '',
      librarian_remarks: '',
      mis_remarks: '',
      programhead_remarks: '',
      purchasing_remarks: '',
      registrar_remarks: '',
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
