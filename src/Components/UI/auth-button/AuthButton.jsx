import React from 'react';
import { useAuth } from '../../../context/AuthContext'; // Import the auth context
import { useNavigate } from 'react-router-dom';

const AuthButton = () => {
  const { user, logout, loading } = useAuth() // Access user and logout function
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return <button className="btn btn-secondary">Loading...</button> // Show loading state while checking auth
  }

  if (user === null) {
    return (
      <button className="btn btn-primary" onClick={() => navigate('/login')}>
        Login
      </button>
    );
  }

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default AuthButton;
