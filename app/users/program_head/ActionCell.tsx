import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../components/DropdownWithInput';
import {
  updateProgramHeadStatus,
  StudentDetailsProgramHead,
  updateProgramHeadRemarks,
} from './action'; // Import the function and interface

const ActionCell = ({
  isProgramHeadCleared,
  studentNo,
  programheadRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isProgramHeadCleared: boolean;
  studentNo: string;
  programheadRemarks: string;
  studentDetails: StudentDetailsProgramHead; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isProgramHeadCleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_programhead_cleared: value === 'Cleared',
    };
    updateProgramHeadStatus(updatedDetails);
  };

  const handleRemarksSubmit = (remarks: string) => {
    const updatedDetails = {
      ...studentDetails,
      cashier_remarks: remarks,
    };
    updateProgramHeadRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isProgramHeadCleared ? 'Cleared' : 'Uncleared');
  }, [isProgramHeadCleared]);

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
        initialInputValue={programheadRemarks}
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#85BDEE'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
