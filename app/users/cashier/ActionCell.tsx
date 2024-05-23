import { useState } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';

const ActionCell = () => {
  const [selectedValue, setSelectedValue] = useState('Uncleared');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  return (
    <div
      className={`flex min-w-[300px] max-w-[350px] justify-center ${getBackgroundColor()}`}
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
