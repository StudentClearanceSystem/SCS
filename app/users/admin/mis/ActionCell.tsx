import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../../components/DropdownWithInput';
import { updateMISStatus, StudentDetailsMIS, updateMISRemarks } from './action'; // Import the function and interface
import React from 'react';

const ActionCell = ({
  isMISCleared,
  studentNo,
  misRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isMISCleared: boolean;
  studentNo: string;
  misRemarks: string;
  studentDetails: StudentDetailsMIS; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isMISCleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_mis_cleared: value === 'Cleared',
    };
    updateMISStatus(updatedDetails);
  };

  const handleRemarksSubmit = (remarks: string) => {
    alert('Not allowed to modify');

    // const updatedDetails = {
    //   ...studentDetails,
    //   cashier_remarks: remarks,
    // };
    // updateMISRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isMISCleared ? 'Cleared' : 'Uncleared');
  }, [isMISCleared]);

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
        initialInputValue={misRemarks}
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#5f9bd0'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
