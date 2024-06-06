export interface StudentDetails {
  studentno: string;
  name: string;
  program: string;
  year: string;
  section: string;
  is_cashier_cleared: boolean;
  cashier_remarks: string;
}

export const updateCashierStatus = (studentDetails: StudentDetails) => {
  const { studentno, name, program, year, section, is_cashier_cleared } =
    studentDetails;
  alert(`Student No: ${studentno}
  Name: ${name}
  Program: ${program}
  Year: ${year}
  Section: ${section}
  Cashier Cleared: ${is_cashier_cleared ? 'Yes' : 'No'}`);
};

export const updateCashierRemarks = (studentDetails: StudentDetails) => {
  const { studentno, name, program, year, section, cashier_remarks } =
    studentDetails;
  alert(`Student No: ${studentno}
  Name: ${name}
  Program: ${program}
  Year: ${year}
  Section: ${section}
  Remarks: ${cashier_remarks}`);
};
