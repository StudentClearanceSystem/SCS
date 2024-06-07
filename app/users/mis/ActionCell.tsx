import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';
import { updateMISStatus, StudentDetailsMIS } from './action'; // Import the function and interface

const ActionCell = ({
  isMISCleared,
  studentNo,
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

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_mis_cleared: value === 'Cleared',
    };
    updateMISStatus(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isMISCleared ? 'Cleared' : 'Uncleared');
  }, [isMISCleared]);

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
        remarks={misRemarks} // Pass the misRemarks value
        studentDetails={studentDetails} // Pass the studentDetails prop
      />
    </div>
  );
};

export default ActionCell;
