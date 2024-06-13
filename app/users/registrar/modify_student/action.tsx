import { supabase } from '@/app/lib/supabase';

export interface StudentDetailsRegistrar {
  studentno: string;
  name: string;
  program: string;
  year: number;
  section: number;
  is_registrar_cleared: boolean;
  registrar_remarks: string;
}

export const insertStudentData = async (
  studentData: Omit<
    StudentDetailsRegistrar,
    'is_registrar_cleared' | 'registrar_remarks'
  >,
) => {
  const { data, error } = await supabase.from('table_students').insert({
    studentno: studentData.studentno,
    name: studentData.name,
    program: studentData.program,
    year: studentData.year,
    section: studentData.section,
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
    console.error('Error inserting data:', error);
    throw error;
  }

  return data; // Return the inserted data for further processing if needed
};
