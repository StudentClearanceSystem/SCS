import { supabase } from '@/app/lib/supabase';

export interface StudentDetailsDiscipline {
  studentno: string;
  name: string;
  program: string;
  sy_term: string;
  is_discipline_cleared: boolean;
  discipline_remarks: string | null;
}

export const updateDisciplineStatus = async (
  studentDetails: StudentDetailsDiscipline,
) => {
  const { studentno, name, program, sy_term, is_discipline_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetailsDiscipline> = { is_discipline_cleared };

  // If the discipline is cleared, set discipline_remarks to an empty string
  if (is_discipline_cleared) {
    updateData.discipline_remarks = null;
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating discipline status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year_Term: ${sy_term}
    Discipline Cleared: ${is_discipline_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateDisciplineRemarks = async (
  studentDetails: StudentDetailsDiscipline,
) => {
  const {
    studentno,
    name,
    program,
    sy_term,
    is_discipline_cleared,
    discipline_remarks,
  } = studentDetails;

  // Update the discipline_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ discipline_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating discipline remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year_Term: ${sy_term}
    Discipline Cleared: ${is_discipline_cleared ? 'Yes' : 'No'}
    Remarks: ${discipline_remarks}`);
  }
};
