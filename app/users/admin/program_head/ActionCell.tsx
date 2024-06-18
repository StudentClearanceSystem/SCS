import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import {
  updateProgramHeadStatus,
  StudentDetailsProgramHead,
  updateProgramHeadRemarks,
} from './action'; // Import the function and interface
import DropdownWithInput from '@/app/components/DropdownWithInput';

const ActionCell = ({
  isProgramHeadCleared,
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
  const [remarks, setRemarks] = useState(programheadRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_programhead_cleared: value === 'Cleared',
    };
    updateProgramHeadStatus(updatedDetails);
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
    //        programhead_remarks: remarks, // Changed from cashier_remarks to programhead_remarks
    // };
    // updateProgramHeadRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isProgramHeadCleared ? 'Cleared' : 'Uncleared');
  }, [isProgramHeadCleared]);

  useEffect(() => {
    setRemarks(programheadRemarks); // Update remarks state when programheadRemarks prop changes
  }, [programheadRemarks]);

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
        bgColor={'#85BDEE'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
