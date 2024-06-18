import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import {
  updateCashierStatus,
  updateCashierRemarks,
  StudentDetailsCashier,
} from './action';
import DropdownWithInput from '@/app/components/DropdownWithInput';

const ActionCell = ({
  isCashierCleared,
  cashierRemarks,
  studentDetails,
}: {
  isCashierCleared: boolean;
  studentNo: string;
  cashierRemarks: string;
  studentDetails: StudentDetailsCashier;
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isCashierCleared ? 'Cleared' : 'Uncleared',
  );
  const [remarks, setRemarks] = useState(cashierRemarks); // Added state for remarks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open state

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_cashier_cleared: value === 'Cleared',
    };
    updateCashierStatus(updatedDetails);
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
    // updateCashierRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isCashierCleared ? 'Cleared' : 'Uncleared');
  }, [isCashierCleared]);

  useEffect(() => {
    setRemarks(cashierRemarks); // Update remarks state when programheadRemarks prop changes
  }, [cashierRemarks]);

  return (
    <div
      className={`flex min-w-[300px] max-w-[350px] items-center justify-center ${getBackgroundColor()}`}
    >
      <RadioGroup
        value={selectedValue}
        orientation="horizontal"
        isDisabled={true} // Disable the entire RadioGroup
        className="cursor-not-allowed" // Add cursor-not-allowed class
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
        bgColor={'#6CCEE8'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
