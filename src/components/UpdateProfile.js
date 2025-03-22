import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Update() {
  var [name, setName] = useState("");
  var [age, setAge] = useState("")
  var [gender, setGender] = useState("");
  var [address, setAddress] = useState("");
  var [contactnumber, setContactNumber] = useState("");
  var [errorMessage, setErrorMessage] = useState("");
  var navigate = useNavigate();

  useEffect(() => {
    // Fetch the user profile data when the component mounts
    axios
      .get("http://127.0.0.1:8080/patientsapi/user_profile", {
        headers: { Authorization: "Token " + localStorage.getItem("authToken") },
      })
      .then((response) => {
        // Set state with the fetched data
        const userData = response.data;
        setName(userData.name);
        setAge(userData.age);
        setGender(userData.gender);
        setAddress(userData.address);
        setContactNumber(userData.contactnumber);
      })
      .catch((error) => {
        console.log('Full error:', error);
        setErrorMessage("Failed to load user profile");
      });
  }, []);
  
  function updateUser() {
    var user = {
      name: name,
      gender: gender,
      age: age,
      contactnumber: contactnumber,
      address: address,
    };

    axios
    .put("http://127.0.0.1:8080/patientsapi/update_profile", user,{
      
        headers: { Authorization: "Token " + localStorage.getItem("authToken") },
      })
    
    .then((response) => {
      setErrorMessage("");
      navigate("/");
    })
    .catch((error) => {
      console.log('Full error:', error);  // Log the entire error object
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessage(Object.values(error.response.data.errors).join(" "));
      } else {
        setErrorMessage("Failed to connect to API");
      }
    });
}

  // const handleLogout = () => {
  //   alert("You have been logged out.");
  //   navigate("/login"); 
  // };

  return (
    <>
    {/* Navbar */}
    <Navbar />

    <div
    
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/abstract-blur-hospital-corridor-defocused-medical-background_293060-2293.jpg?w=2000")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <h2 className="text-center mt-4">Update Profile</h2>
              <form >
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactNumber"
                    value={contactnumber}
                    onChange={(event) => setContactNumber(event.target.value)}
                    required
                  />
                </div>
                {errorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                  {errorMessage}
                </div>
                )}
                <button
                type="button"
                className="btn btn-primary w-100"
                onClick={updateUser}
              >
                Submit
              </button>
              </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Update;