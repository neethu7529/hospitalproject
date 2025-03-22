import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import axios from "axios";

const DoctorsList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [doctorsData, setDoctorsData] = useState([]);
  const [department, setDepartment] = useState("");

  const doctorsPerPage = 6;

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/patientsapi/doctors", {
      headers: { Authorization: "Token " + localStorage.getItem("authToken") },
    })
    .then((response) => setDoctorsData(response.data))
    .catch((error) => setErrorMessage("Failed to fetch doctors data"));
  }, []);

  console.log("Doctors Data:", doctorsData);

  const filteredDoctors = Array.isArray(doctorsData) ? doctorsData.filter((doctor) => {
    const doctorName = doctor.name ? doctor.name.toLowerCase() : "";
    const doctorDepartment = doctor.department ? doctor.department.toLowerCase() : "";

    
    if (search === "") {
      if (department === "") {
        return true;
      } else {
        return doctorDepartment.includes(department.toLowerCase());
      }
    }

    if (department === "name") {
      return doctorName.includes(search.toLowerCase());
    } else if (department === "department") {
      return doctorDepartment.includes(search.toLowerCase());
    }

    return doctorName.includes(search.toLowerCase());
  }) : [];

  console.log("Filtered Doctors:", filteredDoctors);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center mb-4">Our Doctors</h1>

        <div className="mb-4 d-flex justify-content-between align-items-center">
          <a href="/bookappointment">
            <button className="btn btn-primary">Book Appointment</button>
          </a>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search doctor by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Search</option>
              <option value="name">Search by Doctor</option>
              <option value="department">Search by Department</option>
            </select>
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="row">
          {currentDoctors.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            currentDoctors.map((doctor) => (
              <div key={doctor.id} className="col-md-4 col-sm-6 mb-4">
                <div className="card shadow h-100">
                  <img
                    src={doctor.display_picture}
                    className="card-img-top mx-auto d-block"
                    alt={doctor.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginTop: "15px",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{doctor.name}</h5>
                    <p className="card-text">{doctor.Qualification}</p>
                    <p className="card-text">
                      <strong>Experience:</strong> {doctor.Experience} years
                    </p>
                    <p className="card-text">
                      <strong>Department:</strong> {doctor.department}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <nav className="mt-4">
<ul className="pagination justify-content-center">
  {Array.from({ length: totalPages }, (_, index) => (
    <li
      key={index}
      className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
      onClick={() => handlePageChange(index + 1)}
    >
      <button className="page-link">{index + 1}</button>
    </li>
  ))}
</ul>

          </nav>
        )}
      </div>
    </>
  );
};

export default DoctorsList;