import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);

  // User persistence
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
      setUser(null);
    }

    try {
      if (storedRole) {
        setUserRole(storedRole); // Assuming `role` is not JSON
      }
    } catch (error) {
      console.error("Error parsing stored role:", error);
      setUserRole(null);
    }
  }, []);

  // Login function
  const loginUser = async (email, password, role) => {
    try {
      setLoading(true);

      // Set API endpoint based on role
      let apiUrl;
      if (role === "company") {
        apiUrl = "http://localhost:5500/api/v1/companies/login";
      } else if (role === "employee") {
        apiUrl = "http://localhost:5500/api/v1/employees/login";
      } else if (role === "admin") {
        apiUrl = "http://localhost:5500/api/v1/admins/login";
      } else {
        throw new Error("Invalid role selected");
      }

      // Make API call
      const response = await axios.post(apiUrl, { email, password });


      if (response.data.success) {
        const { token, profile, role, message } = response.data;

        // Store user and token in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(profile));
        localStorage.setItem("role", role);

        // Update user state
        setUser(profile);
        setUserRole(role);
        toast.success(response.data.message, {
          style: {
            background: 'var(--primary-color)', // Set background color
            color: '#ffffff', // Set text color
            borderRadius: '8px', // Optional: add rounded corners
            padding: '10px', // Optional: add padding
          },
        });

        return { success: true, message: "Login successful" };
      } else {
        return {
          success: false,
          message: response.data.message || "Login failed",
        };
      }
    } catch (error) {
      toast(error);
      return { success: false, message: "An error occurred during login" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setUserRole(null);
    setLoginMessage(null);
  };

  const authInfo = {
    user,
    loginUser,
    logoutUser,
    loading,
    setLoading,
    userRole
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
