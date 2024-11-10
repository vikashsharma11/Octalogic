import React, { useState, useContext } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import './tailWind.css';

function DateAndTime() {
  const navigate = useNavigate();
  const { user, booking, setBooking } = useContext(UserContext);
  

  // State to store the selected date range
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  // State to manage the visibility of the date picker and error messages
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  // Toggle date picker visibility
  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };
 
  // Handle date selection
  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };
  


  // Handle form submission to send booking data to backend
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Prepare payload with user and booking information
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      vehicleId: booking.vehicleId,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };
    
    try {
      console.log("Booking Payload:", payload); // Debugging

      // Send booking request to the backend
      const response = await axios.post('https://octalogic-backend-sg2l.onrender.com/api/booking', payload);

      if (response.status === 201) {
        // Booking confirmed, update booking state if needed
        setBooking({ ...booking, dateRange });

        // Navigate to the confirmation page
        navigate('/Confirmed', { state: { booking: response.data.booking } });
      } else {
        // Handle unexpected successful responses
        setError('Unexpected response from the server.');
      }
    } catch (err) {
      console.error('Error during booking:', err);

      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || 'Booking already exists. Try a different vehicle or dates.');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Please try again later.');
      } else {
        // Something else caused the error
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md pt-10 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Select Date Range</h1>

        {/* Display user and vehicle info for confirmation */}
        <div className="mb-4">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Vehicleid:</strong> {booking.vehicleId}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            {/* Display the selected dates */}
            <input
              readOnly
              value={`${format(dateRange.startDate, 'dd MMM yyyy')} - ${format(dateRange.endDate, 'dd MMM yyyy')}`}
              onClick={toggleDatePicker}
              className="w-full p-2 border rounded cursor-pointer"
            />

            {/* Render the DateRange component only when isOpen is true */}
            {isOpen && (
              <div className="absolute z-10 mt-3">
                <DateRange
                  ranges={[dateRange]}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  direction="horizontal"
                  rangeColors={['#1e90ff']}
                  minDate={new Date()}
                />
              </div>
            )}
          </div>

          {/* Display error message if booking fails */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default DateAndTime;
