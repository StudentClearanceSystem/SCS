'use client';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';

export default function AddUserPage() {
  //style
  const inputStyle = {
    border: 'none',
    boxShadow: 'none',
  };
  //style

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log('Form submitted:', formData);
    // Reset form fields after submission
    setFormData({
      id: '',
      name: '',
      email: '',
      password: '',
      role: '',
    });
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
  };

  return (
    <main className=" flex h-screen min-h-screen flex-col items-center justify-center bg-blue-300">
      <div className="m-5 rounded-lg bg-gray-200 p-5 shadow-2xl">
        <h2 className="mb-8 text-lg font-bold">ADD NEW USER</h2>
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
            labelPlacement="outside"
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
          />
          <Input
            labelPlacement="outside"
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            isRequired
            style={inputStyle} // Apply inputStyle here
          />
          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              className="bg-primary text-background"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button
              type="button"
              className="btn-secondary text-black"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}