import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../../components/DropdownWithInput';
import { updateMISStatus, StudentDetailsMIS, updateMISRemarks } from './action'; // Import the function and interface

const ActionCell = ({
  isMISCleared,
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
  const [remarks, setRemarks] = useState(misRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_mis_cleared: value === 'Cleared',
    };
    updateMISStatus(updatedDetails);
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
    //         mis_remarks: remarks, // Changed from cashier_remarks to mis_remarks
    // };
    // updateMISRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isMISCleared ? 'Cleared' : 'Uncleared');
  }, [isMISCleared]);

  useEffect(() => {
    setRemarks(misRemarks); // Update remarks state when misRemarks prop changes
  }, [misRemarks]);

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
        bgColor={'#5f9bd0'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
