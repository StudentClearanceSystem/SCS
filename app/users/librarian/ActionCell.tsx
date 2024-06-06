import { useState, useEffect } from 'react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import DropdownWithInput from './DropdownWithInput';
import { updateLibrarianStatus, StudentDetails } from './action'; // Import the function and interface

const ActionCell = ({
  isLibrarianCleared,
  studentNo,
  librarianRemarks,
  studentDetails, // Add studentDetails prop
}: {
  isLibrarianCleared: boolean;
  studentNo: string;
  librarianRemarks: string;
  studentDetails: StudentDetails; // Define prop type
}) => {
  const [selectedValue, setSelectedValue] = useState(
    isLibrarianCleared ? 'Cleared' : 'Uncleared',
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    const updatedDetails = {
      ...studentDetails,
      is_librarian_cleared: value === 'Cleared',
    };
    updateLibrarianStatus(updatedDetails);
  };

  const getBackgroundColor = () => {
    return selectedValue === 'Cleared' ? 'bg-green-400' : 'bg-red-300';
  };

  useEffect(() => {
    setSelectedValue(isLibrarianCleared ? 'Cleared' : 'Uncleared');
  }, [isLibrarianCleared]);

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
        remarks={librarianRemarks} // Pass the librarianRemarks value
        studentDetails={studentDetails} // Pass the studentDetails prop
      />
    </div>
  );
};

export default ActionCell;
