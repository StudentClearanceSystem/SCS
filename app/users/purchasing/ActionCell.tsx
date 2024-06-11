import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../components/DropdownWithInput';
import {
  updatePurchasingStatus,
  StudentDetailsPurchasing,
  updatePurchasingRemarks,
} from './action'; // Import the function and interface

const ActionCell = ({
  isPurchasingCleared,
  studentNo,
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

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_purchasing_cleared: value === 'Cleared',
    };
    updatePurchasingStatus(updatedDetails);
  };

  const handleRemarksSubmit = (remarks: string) => {
    const updatedDetails = {
      ...studentDetails,
      cashier_remarks: remarks,
    };
    updatePurchasingRemarks(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isPurchasingCleared ? 'Cleared' : 'Uncleared');
  }, [isPurchasingCleared]);

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
        initialInputValue={purchasingRemarks}
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#FFB980'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
