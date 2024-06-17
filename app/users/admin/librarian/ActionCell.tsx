import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../../components/DropdownWithInput';
import {
  updateLibrarianStatus,
  StudentDetailsLibrarian,
  updateLibrarianRemarks,
} from './action'; // Import the function and interface
import React from 'react';

const ActionCell = ({
  isLibrarianCleared,
  studentNo,
  librarianRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isLibrarianCleared: boolean;
  studentNo: string;
  librarianRemarks: string;
  studentDetails: StudentDetailsLibrarian; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isLibrarianCleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_librarian_cleared: value === 'Cleared',
    };
    updateLibrarianStatus(updatedDetails);
  };

  const handleRemarksSubmit = (remarks: string) => {
    alert('Not allowed to modify');

    // const updatedDetails = {
    //   ...studentDetails,
    //   cashier_remarks: remarks,
    // };
    // updateLibrarianRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isLibrarianCleared ? 'Cleared' : 'Uncleared');
  }, [isLibrarianCleared]);

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
        initialInputValue={librarianRemarks}
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#C7E484'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
