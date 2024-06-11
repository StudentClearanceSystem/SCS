import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from '../../components/DropdownWithInput';
import {
  updateCashierStatus,
  updateCashierRemarks,
  StudentDetailsCashier,
} from './action';

const ActionCell = ({
  isCashierCleared,
  studentNo,
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

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_cashier_cleared: value === 'Cleared',
    };
    updateCashierStatus(updatedDetails);
  };

  const handleRemarksSubmit = (remarks: string) => {
    const updatedDetails = {
      ...studentDetails,
      cashier_remarks: remarks,
    };
    updateCashierRemarks(updatedDetails);
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
        initialInputValue={cashierRemarks}
        placeholder="Remarks..."
        buttonLabel="Submit"
        bgColor={'#6CCEE8'} // Pass the bgColor prop
        onSubmit={handleRemarksSubmit}
      />
    </div>
  );
};

export default ActionCell;
