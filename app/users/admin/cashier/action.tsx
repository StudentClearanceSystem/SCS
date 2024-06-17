import { supabase } from '@/app/lib/supabase';

/**
 * Interface representing student details for cashier clearance.
 */
export interface StudentDetailsCashier {
  studentno: string;
  name: string;
  program: string;
  sy_term: string;
  is_cashier_cleared: boolean;
  cashier_remarks: string;
}

/**
 * Updates the cashier clearance status for a student in the database.
 *
 * @param studentDetails - Student details object containing updated cashier clearance status.
 */
export const updateCashierStatus = async (
  studentDetails: StudentDetailsCashier,
) => {
  const { studentno, name, program, sy_term, is_cashier_cleared } =
    studentDetails;

  /**
   * Create a partial update object with the updated cashier clearance status.
   */
  let updateData: Partial<StudentDetailsCashier> = { is_cashier_cleared };

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
    Year_Term: ${sy_term}
    Cashier Cleared: ${is_cashier_cleared ? 'Yes' : 'No'}`);
  }
};

/**
 * Updates the cashier remarks for a student in the database.
 *
 * @param studentDetails - Student details object containing updated cashier remarks.
 */
export const updateCashierRemarks = async (
  studentDetails: StudentDetailsCashier,
) => {
  const {
    studentno,
    name,
    program,
    sy_term,
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
    Year_Term: ${sy_term}
    Cashier Cleared: ${is_cashier_cleared ? 'Yes' : 'No'}
    Remarks: ${cashier_remarks}`);
  }
};
