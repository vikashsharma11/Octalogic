import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Congrats() {
  const navigate = useNavigate();
  const { booking, user } = useContext(UserContext);

  

  return (
    <div className="w-full max-w-lg pt-20 mx-auto">
      <div className="p-6 text-center bg-green-100 rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-green-700">Booking Confirmed!</h1>
        <p className="mb-2"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p className="mb-2"><strong>VehicleId:</strong> {booking.vehicleId}</p>
        <p className="mb-2"><strong>Start Date:</strong> {new Date(booking.dateRange.startDate).toLocaleDateString()}</p>
        <p className="mb-4"><strong>End Date:</strong> {new Date(booking.dateRange.endDate).toLocaleDateString()}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
        >
          Book Another Vehicle
        </button>
      </div>
    </div>
  );
}

export default Congrats;
