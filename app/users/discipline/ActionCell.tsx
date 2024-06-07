import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';
import { updateDisciplineStatus, StudentDetailsDiscipline } from './action'; // Import the function and interface

const ActionCell = ({
  isDisciplineCleared,
  studentNo,
  disciplineRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isDisciplineCleared: boolean;
  studentNo: string;
  disciplineRemarks: string;
  studentDetails: StudentDetailsDiscipline; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isDisciplineCleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_discipline_cleared: value === 'Cleared',
    };
    updateDisciplineStatus(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isDisciplineCleared ? 'Cleared' : 'Uncleared');
  }, [isDisciplineCleared]);

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
        remarks={disciplineRemarks} // Pass the disciplineRemarks value
        studentDetails={studentDetails} // Pass the studentDetails prop
      />
    </div>
  );
};

export default ActionCell;
