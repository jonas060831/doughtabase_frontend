



import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage (or other storage method)

      if (!token) {
        // No token found, redirect to login
        navigate("/login");
        return;
      }

      try {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired, redirect to login
          localStorage.removeItem("token"); // Remove the expired token
          navigate("/login");
        }
      } catch (error) {
        // Invalid token, redirect to login
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);
}


export const auth = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
  if (!token) {
    // If no token exists in localStorage, return null
    return null;
  }

  try {
    // Try decoding the token
    const decoded = jwtDecode(token);

    // Optional: You can add additional checks here (e.g., expiration)
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      // If the token is expired, remove it and return null
      localStorage.removeItem("token");
      return null;
    }

    return decoded; // Return decoded token if valid
  } catch (error) {
    // Catch any error that occurs during decoding
    console.error("Failed to decode token:", error);
    return null;
  }
};
