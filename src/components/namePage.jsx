import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './tailWind.css';

function NamePage() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from context

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update context with user information
    setUser({ firstName, lastName });

    // Navigate to the next page
    navigate('/wheelsType');
  };

  return (
    <div className="w-full max-w-lg pt-20 mx-auto">
      <div className="form-container">
        <form
          className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg custom-form-container"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <h1 className="mb-4 text-2xl font-bold">First, what's your name?</h1>

          {/* First Name Input */}
          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg shadow-sm custom-input"
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-bold text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg shadow-sm custom-input"
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default NamePage;
