import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';

import {
  StudentDetailsRegistrar,
  updateRegistrarRemarks,
  updateRegistrarStatus,
} from '../action';

const ActionCell = ({
  isRegistrarCleared,
  studentNo,
  studentDetails, // Add studentDetails prop
}: {
  isRegistrarCleared: boolean;
  studentNo: string;
  registrarRemarks: string;
  studentDetails: StudentDetailsRegistrar; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isRegistrarCleared ? 'Cleared' : 'Uncleared',
  );

  useEffect(() => {
    setSelectedValue(isRegistrarCleared ? 'Cleared' : 'Uncleared');
  }, [isRegistrarCleared]);

  return (
    <div
      className={'lex min-w-[300px] max-w-[350px] items-center justify-center'}
    ></div>
  );
};

export default ActionCell;
