import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import {
  updateDisciplineStatus,
  StudentDetailsDiscipline,
  updateDisciplineRemarks,
} from './action'; // Import the function and interface
import DropdownWithInput from '../../../components/DropdownWithInput';
import React from 'react';

const ActionCell = ({
  isDisciplineCleared,
  disciplineRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isDisciplineCleared: boolean;
  studentNo: string;
  disciplineRemarks: string;
  studentDetails: StudentDetailsDiscipline; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isDisciplineCleared ? 'Cleared' : 'Uncleared',
  );
  const [remarks, setRemarks] = useState(disciplineRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_discipline_cleared: value === 'Cleared',
    };
    updateDisciplineStatus(updatedDetails);
    if (value === 'Uncleared') {
      setIsDropdownOpen(true); // Open the dropdown if "Uncleared" is selected
    } else {
      setIsDropdownOpen(false); // Close the dropdown if "Cleared" is selected
    }
  };

  const handleRemarksSubmit = (remarks: string) => {
    alert('Not allowed to modify');

    // const updatedDetails = {
    //   ...studentDetails,
    //         discipline_remarks: remarks,

    // };
    // updateDisciplineRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isDisciplineCleared ? 'Cleared' : 'Uncleared');
  }, [isDisciplineCleared]);

  useEffect(() => {
    setRemarks(disciplineRemarks); // Update remarks state when disciplineRemarks prop changes
  }, [disciplineRemarks]);

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
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
        initialInputValue={remarks} // Use remarks state
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#BF88FF'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
