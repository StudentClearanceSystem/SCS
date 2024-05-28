import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';

type ActionCellProps = {
  cashieriscleared: boolean;
  studentNo: string;
};

const ActionCell = ({ cashieriscleared, studentNo }: ActionCellProps) => {
  const [selectedValue, setSelectedValue] = useState(
    cashieriscleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    // Update the backend or parent state with the new value
    updateCashierStatus(studentNo, value === 'Cleared');
  };

  const updateCashierStatus = async (studentNo: string, isCleared: boolean) => {
    // This function should update the cashieriscleared status in the backend or parent state
    // Here we just log it for demonstration
    console.log(`Updating studentNo ${studentNo} to ${isCleared}`);
    // Add your update logic here
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(cashieriscleared ? 'Cleared' : 'Uncleared');
  }, [cashieriscleared]);

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
      <DropdownWithInput disabled={selectedValue === 'Cleared'} />
    </div>
  );
};

export default ActionCell;
