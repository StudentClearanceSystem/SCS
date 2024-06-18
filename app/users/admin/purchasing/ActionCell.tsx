import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../../components/DropdownWithInput';
import {
  updatePurchasingStatus,
  StudentDetailsPurchasing,
  updatePurchasingRemarks,
} from './action'; // Import the function and interface

const ActionCell = ({
  isPurchasingCleared,
  purchasingRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isPurchasingCleared: boolean;
  studentNo: string;
  purchasingRemarks: string;
  studentDetails: StudentDetailsPurchasing; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isPurchasingCleared ? 'Cleared' : 'Uncleared',
  );
  const [remarks, setRemarks] = useState(purchasingRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_purchasing_cleared: value === 'Cleared',
    };
    updatePurchasingStatus(updatedDetails);
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
    // purchasing_remarks: remarks, // Changed from cashier_remarks to purchasing_remarks
    // };
    // updatePurchasingRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isPurchasingCleared ? 'Cleared' : 'Uncleared');
  }, [isPurchasingCleared]);

  useEffect(() => {
    setRemarks(purchasingRemarks); // Update remarks state when purchasingRemarks prop changes
  }, [purchasingRemarks]);

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
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
        initialInputValue={remarks} // Use remarks state
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#FFB980'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
