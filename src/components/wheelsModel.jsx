import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import './tailWind.css';


function WheelsModel() {
  const navigate = useNavigate();
  const { booking, setBooking } = useContext(UserContext);

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`https://octalogic-backend-sg2l.onrender.com/api/vehicles/${booking.typeId}`);
        setVehicles(response.data);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to fetch vehicles. Please try again.');
      }
    };

    if (booking.typeId) {
      fetchVehicles();
    } else {
      // If type isn't selected, navigate back
      navigate('/wheelsName');
    }
  }, [booking.typeId, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedVehicleId) {
      setBooking({ ...booking, vehicleId: selectedVehicleId });
      navigate('/dateAndTime');
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
          <h1 className="mb-4 text-2xl font-bold">Select Vehicle Model</h1>

          {/* Vehicle Model Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Choose a model:</label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a vehicle model</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
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

export default WheelsModel;
