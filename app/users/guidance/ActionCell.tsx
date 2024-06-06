import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';
import { updateGuidanceStatus, StudentDetails } from './action'; // Import the function and interface

const ActionCell = ({
  isGuidanceCleared,
  studentNo,
  guidanceRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isGuidanceCleared: boolean;
  studentNo: string;
  guidanceRemarks: string;
  studentDetails: StudentDetails; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isGuidanceCleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_guidance_cleared: value === 'Cleared',
    };
    updateGuidanceStatus(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isGuidanceCleared ? 'Cleared' : 'Uncleared');
  }, [isGuidanceCleared]);

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
        remarks={guidanceRemarks} // Pass the guidanceRemarks value
        studentDetails={studentDetails} // Pass the studentDetails prop
      />
    </div>
  );
};

export default ActionCell;
