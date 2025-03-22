import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const BookAppointment = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch doctors on component mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/patientsapi/doctors", {
        headers: { Authorization: "Token " + localStorage.getItem("authToken") },
      })
      .then((response) => {
        setDoctorsData(response.data);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch doctors data");
      });
  }, []);

  // const convertToDateFormat = (dateString) => {
  //   const [day, month, year] = dateString.split('-'); // Split DD-MM-YYYY into day, month, year
  //   return ${year}-${month}-${day}; // Return YYYY-MM-DD format
  // };

  // Handle form submission (POST request)
  const handleSubmit = (e) => {
    e.preventDefault();

     // Convert the date to YYYY-MM-DD format
    const formattedDate = appointmentDate;

    const appointmentData = {
      doctor: doctorId,
      date: formattedDate,
      time: appointmentTime,
    };
    console.log(appointmentData.date)
    console.log(appointmentData.doctor)
    console.log(appointmentData.time)
    axios
      .post("http://127.0.0.1:8080/patientsapi/bookappointment", appointmentData, {
        headers: { Authorization: "Token " + localStorage.getItem("authToken") },
      })
      .then((response) => {
        setSuccessMessage("Appointment booked successfully!");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Failed to book appointment. Please try again.");
        setSuccessMessage("");
      });
  };

  return (
    <>
    {/* Navbar */}
    <Navbar />
    <div className="container my-5">
      <h2 className="text-center mb-4">Book an Appointment</h2>
      
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Appointment Booking Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="doctorId" className="form-label">
            Select Doctor
          </label>
          <select
            id="doctorId"
            className="form-select"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {/* Render list of doctors */}
            {doctorsData.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">
            Appointment Date
          </label>
          <input
            type="date"
            id="appointmentDate"
            className="form-control"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="appointmentTime" className="form-label">
            Appointment Time
          </label>
          <input
            type="time"
            id="appointmentTime"
            className="form-control"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
    </>
  );
};

export default BookAppointment;