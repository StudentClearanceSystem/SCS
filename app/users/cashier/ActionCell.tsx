import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';
import { updateCashierStatus, StudentDetails } from './action'; // Import the function and interface

const ActionCell = ({
  isCashierCleared,
  studentNo,
  cashierRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isCashierCleared: boolean;
  studentNo: string;
  cashierRemarks: string;
  studentDetails: StudentDetails; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isCashierCleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_cashier_cleared: value === 'Cleared',
    };
    updateCashierStatus(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isCashierCleared ? 'Cleared' : 'Uncleared');
  }, [isCashierCleared]);

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
        remarks={cashierRemarks} // Pass the cashierRemarks value
        studentDetails={studentDetails} // Pass the studentDetails prop
      />
    </div>
  );
};

export default ActionCell;
