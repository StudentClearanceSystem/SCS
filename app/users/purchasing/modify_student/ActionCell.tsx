import { useState, useEffect } from 'react';

import { StudentDetailsRegistrar } from '../../registrar/action';

const ActionCell = ({
  studentNo,
  studentDetails, // Add studentDetails prop
}: {
  studentNo: string;
  studentDetails: StudentDetailsRegistrar; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {}, []);

  return (
    <div
      className={'lex min-w-[300px] max-w-[350px] items-center justify-center'}
    ></div>
  );
};

export default ActionCell;
