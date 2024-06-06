import { supabase } from '@/app/lib/supabase';

export interface StudentDetailsGuidance {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_guidance_cleared: boolean;
  guidance_remarks: string;
}

export const updateGuidanceStatus = async (
  studentDetails: StudentDetailsGuidance,
) => {
  const { studentno, name, program, year, section, is_guidance_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetailsGuidance> = { is_guidance_cleared };

  // If the guidance is cleared, set guidance_remarks to an empty string
  if (is_guidance_cleared) {
    updateData.guidance_remarks = '';
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating guidance status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Guidance Cleared: ${is_guidance_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateGuidanceRemarks = async (
  studentDetails: StudentDetailsGuidance,
) => {
  const {
    studentno,
    name,
    program,
    year,
    section,
    is_guidance_cleared,
    guidance_remarks,
  } = studentDetails;

  // Update the guidance_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ guidance_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating guidance remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Guidance Cleared: ${is_guidance_cleared ? 'Yes' : 'No'}
    Remarks: ${guidance_remarks}`);
  }
};
