'use client';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

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

    // Validate email
    const emailPattern = /^[a-zA-Z.]+@sjdelmonte\.sti\.edu\.ph$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage(
        'Email must follow the structure name@sjdelmonte.sti.edu.ph',
      );
      return;
    }

    // Submit to Supabase
    const url = '/auth/signup'; // Assuming this is the endpoint where you handle signup
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      alert('User added successfully!');
    } else {
      try {
        // Attempt to parse the JSON response
        const data = await response.json();

        // Check if the response contains valid JSON data
        if (data && data.error && data.error.message) {
          setErrorMessage(data.error.message);
        } else {
          // Handle other types of errors if needed
          setErrorMessage('An error occurred while processing your request.');
        }
      } catch (error) {
        // Handle JSON parsing error
        setErrorMessage('An error occurred while processing the response.');
      }
    }
  };

  const handleCancel = () => {
    // Reset form fields on cancel
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    setErrorMessage('');
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-300 p-5">
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
          <div className="flex justify-end space-x-3">
            <Button
              type="submit"
              className="bg-primary text-background sm:text-[8px] md:text-base lg:text-lg"
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
