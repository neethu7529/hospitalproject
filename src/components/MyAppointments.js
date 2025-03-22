import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Appointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setErrorMessage("User not authenticated. Please log in.");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8080/patientsapi/appointment_history", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log("Fetched Data:", response.data);
        setUpcomingAppointments(response.data.upcoming_appointments || []);
        setPastAppointments(response.data.past_appointments || []);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setErrorMessage("Failed to fetch appointment history. Please try again.");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center mb-4">My Appointments</h1>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        {/* Upcoming Appointments */}
        <div className="mb-5">
          <h2 className="mb-3">Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <p className="text-muted">No upcoming appointments.</p>
          ) : (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="card shadow mb-3">
                <div className="card-body">
                  <h5>Dr. {appointment.doctor}</h5>
                  <p><strong>Department:</strong> {appointment.department || "N/A"}</p>
                  <p><strong>Date:</strong> {appointment.appointment_date || "N/A"}</p>
                  <p><strong>Time:</strong> {appointment.appointment_time || "N/A"}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Past Appointments */}
        <div className="mb-5">
          <h2 className="mb-3">Past Appointments</h2>
          {pastAppointments.length === 0 ? (
            <p className="text-muted">No past appointments.</p>
          ) : (
            pastAppointments.map((appointment) => (
              <div key={appointment.id} className="card shadow mb-3 bg-light">
                <div className="card-body">
                  <h5>Dr. {appointment.doctor}</h5>
                  <p><strong>Department:</strong> {appointment.department || "N/A"}</p>
                  <p><strong>Date:</strong> {appointment.appointment_date || "N/A"}</p>
                  <p><strong>Time:</strong> {appointment.appointment_time || "N/A"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Appointments;
