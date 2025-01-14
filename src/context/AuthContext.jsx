import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create a context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide auth state to the rest of the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store logged-in user
  const [loading, setLoading] = useState(true); // Loading state to handle async logic

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds

        if (decoded.exp < currentTime) {
          // If token is expired, remove it and set user as null
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser(decoded); // Set the decoded user if the token is valid
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null); // If decoding fails, set user to null
      }
    } else {
      setUser(null); // If no token, set user as null
    }

    setLoading(false); // Set loading to false after checking auth status
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token); // Save token to localStorage
    const decoded = jwtDecode(token);
    setUser(decoded); // Set user state to the decoded token
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
