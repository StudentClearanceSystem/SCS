'use client';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

export default function AddStudentPage() {
  // Style
  const inputStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  // State
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    middleName: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate ID length
    if (formData.id.length !== 11) {
      setErrorMessage('ID must be exactly 11 digits long');
      return;
    }

    // Output form data with alert after successful submission
    alert(
      `User added successfully!\nID: ${formData.id}\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nMiddle Name: ${formData.middleName}`,
    );

    // Reset form fields
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      middleName: '',
    });
    // try {
    //   // Attempt to parse the JSON response
    //   const data = await response.json();

    //   // Check if the response contains valid JSON data
    //   if (data && data.error && data.error.message) {
    //     setErrorMessage(data.error.message);
    //   } else {
    //     // Handle other types of errors if needed
    //     setErrorMessage('An error occurred while processing your request.');
    //   }
    // } catch (error) {
    //   // Handle JSON parsing error
    //   setErrorMessage('An error occurred while processing the response.');
    // }
  };

  const handleCancel = () => {
    // Reset form fields on cancel
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      middleName: '',
    });
    setErrorMessage('');
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#C28FC2] p-5">
      <div className=" w-full max-w-[95%] rounded-lg bg-gray-200 p-5 shadow-2xl">
        <h2 className="mb-8 text-lg font-bold sm:text-[8px] md:text-base lg:text-lg">
          ADD STUDENT
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 sm:text-[8px] md:text-base lg:text-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex justify-center space-x-3">
            <Input
              labelPlacement="outside"
              label="ID (11 digits)"
              name="id"
              value={formData.id}
              onChange={handleChange}
              isRequired
              minLength={11}
              maxLength={11}
              style={inputStyle}
              className="w-32 sm:text-[8px] md:text-[12px] lg:text-[10px]"
            />
            <Input
              labelPlacement="outside"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isRequired
              style={inputStyle}
              className="w-32 sm:text-[8px] md:text-[12px] lg:text-[10px]"
            />
            <Input
              labelPlacement="outside"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isRequired
              style={inputStyle}
              className="w-32 sm:text-[8px] md:text-[12px] lg:text-[10px]"
            />
            <Input
              labelPlacement="outside"
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              style={inputStyle}
              className="w-32 sm:text-[8px] md:text-[12px] lg:text-[10px]"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              className="bg-primary text-background sm:text-[8px] md:text-base lg:text-lg"
            >
              Add
            </Button>
            <Link href="/users/registrar">
              <Button
                type="button"
                className="btn-secondary text-black sm:text-[8px] md:text-base lg:text-lg"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
