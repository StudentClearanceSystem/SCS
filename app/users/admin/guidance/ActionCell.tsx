import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import {
  updateGuidanceStatus,
  StudentDetailsGuidance,
  updateGuidanceRemarks,
} from './action'; // Import the function and interface
import DropdownWithInput from '@/app/components/DropdownWithInput';

const ActionCell = ({
  isGuidanceCleared,
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
  const [remarks, setRemarks] = useState(guidanceRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_guidance_cleared: value === 'Cleared',
    };
    updateGuidanceStatus(updatedDetails);
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

  useEffect(() => {
    setRemarks(guidanceRemarks); // Update remarks state when guidanceRemarks prop changes
  }, [guidanceRemarks]);

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
        bgColor={'#E18B89'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
