import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../../components/DropdownWithInput';
import {
  updateGuidanceStatus,
  StudentDetailsGuidance,
  updateGuidanceRemarks,
} from './action'; // Import the function and interface
import React from 'react';

const ActionCell = ({
  isGuidanceCleared,
  studentNo,
  guidanceRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isGuidanceCleared: boolean;
  studentNo: string;
  guidanceRemarks: string;
  studentDetails: StudentDetailsGuidance; // Define prop type
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

  const handleRemarksSubmit = (remarks: string) => {
    alert('Not allowed to modify');

    // const updatedDetails = {
    //   ...studentDetails,
    //   cashier_remarks: remarks,
    // };
    // updateGuidanceRemarks(updatedDetails);
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
        isDisabled={true} // Disable the entire RadioGroup
        className="cursor-not-allowed" // Add cursor-not-allowed class
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
        initialInputValue={guidanceRemarks}
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#E18B89'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
