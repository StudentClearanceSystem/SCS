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
    id: '',
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

    // Validate ID
    if (!/^\d{6}$/.test(formData.id)) {
      setErrorMessage('ID must be exactly 6 digits.');
      return;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z]+[.]+[0-9]{6}@sjdelmonte\.sti\.edu\.ph$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage(
        'Email must follow the structure name6digits@sjdelmonte.sti.edu.ph',
      );
      return;
    }

    // Output all input values
    const output = `ID: ${formData.id}\nName: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}\nRole: ${selectedRole}`;
    alert(output);

    // Reset form fields after submission
    setFormData({
      id: '',
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
      id: '',
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
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-blue-300">
      <div className="m-5 rounded-lg bg-gray-200 p-5 shadow-2xl">
        <h2 className="mb-8 text-lg font-bold">ADD NEW USER</h2>
        {errorMessage && (
          <div className="mb-4 text-red-600">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-10">
          <Input
            labelPlacement="outside"
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
          />
          <Input
            labelPlacement="outside"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
          />
          <Input
            labelPlacement="outside"
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
          />
          <Input
            minLength={6}
            labelPlacement="outside"
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
          />
          <p>Role:</p>
          <DropdownComponent
            onSelect={handleRoleChange} // Set selected role
            role={selectedRole} // Pass selected role
          />
          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              className="bg-primary text-background"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Link href="/users/admin">
              <Button
                type="button"
                className="btn-secondary text-black"
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
