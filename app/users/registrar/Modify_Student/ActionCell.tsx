import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';

import DropdownWithInput from '@/app/components/DropdownWithInput';
import {
  StudentDetailsRegistrar,
  updateRegistrarRemarks,
  updateRegistrarStatus,
} from '../action';

const ActionCell = ({
  isRegistrarCleared,
  studentNo,
  registrarRemarks,
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

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_registrar_cleared: value === 'Cleared',
    };
    updateRegistrarStatus(updatedDetails);
  };

  const handleRemarksSubmit = (remarks: string) => {
    const updatedDetails = {
      ...studentDetails,
      cashier_remarks: remarks,
    };
    updateRegistrarRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isRegistrarCleared ? 'Cleared' : 'Uncleared');
  }, [isRegistrarCleared]);

  return (
    <div
      className={`flex min-w-[300px] max-w-[350px] items-center justify-center ${getBackgroundColor()}`}
    >
      <RadioGroup
        value={selectedValue}
        orientation="horizontal"
        onValueChange={handleRadioChange}
      >
        <Radio value="Cleared" color="success">
          Cleared
        </Radio>
        <Radio value="Uncleared" color="danger">
          Uncleared
        </Radio>
      </RadioGroup>
      <DropdownWithInput
        disabled={selectedValue === 'Cleared'}
        initialInputValue={registrarRemarks}
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#FF7EFF'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
