'use client';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import DropdownComponent from './Dropdown';

export default function AddUserPage() {
  // Style
  const inputStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [selectedRole, setSelectedRole] = useState(''); // New state for selected role
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate email
    const emailPattern = /^[a-zA-Z.]+@sjdelmonte\.sti\.edu\.ph$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage(
        'Email must follow the structure name@sjdelmonte.sti.edu.ph',
      );
      return;
    }

    // Output all input values
    const output = `Name: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}\nRole: ${selectedRole}`;
    alert(output);

    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
    });
    setSelectedRole(''); // Reset selected role
  };

  const handleCancel = () => {
    // Reset form fields on cancel
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
    });
    setErrorMessage('');
    setSelectedRole(''); // Reset selected role
  };

  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole);
  };

  return (
    <main className="flex h-screen  flex-col items-center justify-center bg-blue-300 p-5">
      <div className="m-5 w-full max-w-[500px] rounded-lg bg-gray-200 p-5 shadow-2xl">
        <h2 className="mb-8 text-lg font-bold sm:text-[8px] md:text-base lg:text-lg">
          ADD NEW USER
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 sm:text-[8px] md:text-base lg:text-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-10">
          <Input
            labelPlacement="outside"
            label="Name: (firstname.lastname)"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
            className="sm:text-[8px] md:text-base lg:text-lg" // Adjust font size for different screen sizes
          />
          <Input
            labelPlacement="outside"
            type="email"
            label="Email: (name@sjdelmonte.sti.edu.ph)"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
            className="sm:text-[8px] md:text-base lg:text-lg" // Adjust font size for different screen sizes
          />
          <Input
            minLength={6}
            labelPlacement="outside"
            type="password"
            label="Password: (6 digits)"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
            className="sm:text-[8px] md:text-base lg:text-lg" // Adjust font size for different screen sizes
          />
          <div className="flex flex-row items-center pt-2">
            <p className="text-center text-lg sm:text-[8px] md:text-base lg:text-lg">
              Role:
            </p>
            <DropdownComponent
              onSelect={handleRoleChange} // Set selected role
              role={selectedRole} // Pass selected role
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              className="bg-primary text-background sm:text-[8px] md:text-base lg:text-lg"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Link href="/users/admin">
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
