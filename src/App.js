import React from "react";
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div
        className="container-fluid text-white vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            'url("https://tse4.mm.bing.net/th?id=OIP.Fgto_xxPmeIGQyyhanWSUwHaD-&pid=Api&P=0&h=220")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center p-5 bg-dark bg-opacity-75 rounded shadow-lg">
          <h1 className="display-3 mb-4 fw-bold">Welcome to Nims Hospital</h1>
          <p className="lead mb-4">
            Committed to providing exceptional care for your health and well-being.
          </p>
          <div className="row g-4 justify-content-center">
            {/* Book an Appointment Card */}
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-lg bg-light text-dark">
                <div className="card-body text-center p-4">
                  <h5 className="card-title fw-bold">Book an Appointment</h5>
                  <p className="card-text">Quick and easy booking to suit your schedule.</p>
                  <a href="/BookAppointment">
                    <button className="btn btn-primary w-100">Book Now</button>
                  </a>
                </div>
              </div>
            </div>

            {/* Our Specialists Card */}
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-lg bg-light text-dark">
                <div className="card-body text-center p-4">
                  <h5 className="card-title fw-bold">Our Specialists</h5>
                  <p className="card-text">
                    Meet our highly skilled and compassionate doctors.
                  </p>
                  <a href="/DoctorList">
                    <button className="btn btn-primary w-100">View Doctors</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
