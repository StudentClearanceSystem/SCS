import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../../components/DropdownWithInput';
import {
  updateLibrarianStatus,
  StudentDetailsLibrarian,
  updateLibrarianRemarks,
} from './action'; // Import the function and interface

const ActionCell = ({
  isLibrarianCleared,
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
  const [remarks, setRemarks] = useState(librarianRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_librarian_cleared: value === 'Cleared',
    };
    updateLibrarianStatus(updatedDetails);
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
    //         librarian_remarks: remarks,
    // };
    // updateLibrarianRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isLibrarianCleared ? 'Cleared' : 'Uncleared');
  }, [isLibrarianCleared]);

  useEffect(() => {
    setRemarks(librarianRemarks); // Update remarks state when librarianRemarks prop changes
  }, [librarianRemarks]);

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
        bgColor={'#C7E484'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
