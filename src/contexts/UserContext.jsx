import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  // Initialize state for user information
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  });

  // Initialize state for booking information
  const [booking, setBooking] = useState({
    vehicleId: '',
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser, booking, setBooking }}>
      {children}
    </UserContext.Provider>
  );
};
