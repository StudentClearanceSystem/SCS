import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';
import { updateProgramHeadStatus, StudentDetailsProgramHead } from './action'; // Import the function and interface

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
        remarks={programheadRemarks} // Pass the programheadRemarks value
        studentDetails={studentDetails} // Pass the studentDetails prop
      />
    </div>
  );
};

export default ActionCell;
