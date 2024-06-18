import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../../components/DropdownWithInput';
import {
  updateRegistrarStatus,
  StudentDetailsRegistrar,
  updateRegistrarRemarks,
} from './action'; // Import the function and interface

const ActionCell = ({
  isRegistrarCleared,
  registrarRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isRegistrarCleared: boolean;
  studentNo: string;
  registrarRemarks: string;
  studentDetails: StudentDetailsRegistrar; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isRegistrarCleared ? 'Cleared' : 'Uncleared',
  );
  const [remarks, setRemarks] = useState(registrarRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_registrar_cleared: value === 'Cleared',
    };
    updateRegistrarStatus(updatedDetails);
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
    // registrar_remarks: remarks, // Changed from cashier_remarks to registrar_remarks
    // };
    // updateRegistrarRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isRegistrarCleared ? 'Cleared' : 'Uncleared');
  }, [isRegistrarCleared]);

  useEffect(() => {
    setRemarks(registrarRemarks); // Update remarks state when registrarRemarks prop changes
  }, [registrarRemarks]);

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
        bgColor={'#FF7EFF'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
