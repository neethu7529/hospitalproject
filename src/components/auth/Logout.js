import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (if stored in localStorage or sessionStorage)
    localStorage.removeItem("userToken"); // Example: Clearing user token
    sessionStorage.clear();

    // Redirect to login or home page
    navigate("/UserLogin"); // Change this to the route of your login page
  };

  return (
    <>
    <Navbar />
    <div
     
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="text-center p-5 shadow rounded"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 className="mb-4">Are you sure you want to log out?</h2>
        <div>
          <button
            className="btn btn-danger me-3"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)} // Navigate to the previous page
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Logout;
