import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function WheelsType() {
  const navigate = useNavigate();
  const { booking, setBooking } = useContext(UserContext);

  const handleSelection = (category) => {
    setBooking({ ...booking, category });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/wheelsName');
  };

  return (
    <div className="w-full max-w-lg pt-20 mx-auto">
      <div className="form-container">
        <form 
          className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg custom-form-container"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <h1 className="mb-4 text-2xl font-bold">Select Vehicle Category</h1>
          {/* Vehicle Category Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Choose a category:</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="category"
                  value="Car"
                  onChange={() => handleSelection('Car')}
                  required
                />
                <span className="ml-2">4-Wheeler (Car)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="category"
                  value="Bike"
                  onChange={() => handleSelection('Bike')}
                  required
                />
                <span className="ml-2">2-Wheeler (Bike)</span>
              </label>
            </div>
            {/* Next Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WheelsType;