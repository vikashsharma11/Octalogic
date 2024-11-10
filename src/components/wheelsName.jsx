import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import './tailWind.css';


function WheelsName() {
  const navigate = useNavigate();
  const { booking, setBooking } = useContext(UserContext);
  

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');


  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      
      try {
        const response = await axios.get(`https://octalogic-backend-sg2l.onrender.com/api/vehicleType/${booking.category}`);
        setVehicleTypes(response.data);
      } catch (err) {
        console.error('Error fetching vehicle types:', err);
        setError('Failed to fetch vehicle types. Please try again.');
      }
    };

    if (booking.category) {
      fetchVehicleTypes();
    } else {
      // If category isn't selected, navigate back
      navigate('/wheelsType');
    }
  }, [booking.category, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTypeId) {
      setBooking({ ...booking, typeId: selectedTypeId });
      navigate('/wheelsModel');
    }
  };
  

  return (
    <div className="w-full max-w-lg pt-20 mx-auto">
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg custom-form-container"
        >
          {/* Title */}
          <h1 className="mb-4 text-2xl font-bold">Select Vehicle Name</h1>

          {/* Vehicle Type Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Choose a type:</label>
            <select
              value={selectedTypeId}
              onChange={(e) => setSelectedTypeId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a vehicle type</option>
              {vehicleTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

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

export default WheelsName;
