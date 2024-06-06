import { supabase } from '@/app/lib/supabase';

export interface StudentDetails {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_cashier_cleared: boolean;
  cashier_remarks: string;
}

export const updateCashierStatus = async (studentDetails: StudentDetails) => {
  const { studentno, name, program, year, section, is_cashier_cleared } =
    studentDetails;

  let updateData: Partial<StudentDetails> = { is_cashier_cleared };

  // If the cashier is cleared, set cashier_remarks to an empty string
  if (is_cashier_cleared) {
    updateData.cashier_remarks = '';
  }

  // Update the database
  const { data, error } = await supabase
    .from('table_students')
    .update(updateData)
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating cashier status:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Cashier Cleared: ${is_cashier_cleared ? 'Yes' : 'No'}`);
  }
};

export const updateCashierRemarks = async (studentDetails: StudentDetails) => {
  const {
    studentno,
    name,
    program,
    year,
    section,
    is_cashier_cleared,
    cashier_remarks,
  } = studentDetails;

  // Update the cashier_remarks value in the database
  const { data, error } = await supabase
    .from('table_students')
    .update({ cashier_remarks })
    .eq('studentno', studentno)
    .select();

  if (error) {
    console.error('Error updating cashier remarks:', error);
  } else {
    alert(`Student No: ${studentno}
    Name: ${name}
    Program: ${program}
    Year: ${year}
    Section: ${section}
    Cashier Cleared: ${is_cashier_cleared ? 'Yes' : 'No'}
    Remarks: ${cashier_remarks}`);
  }
};
