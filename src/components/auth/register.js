import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [passwordConf, setPasswordConf] = useState("");
  var [errorMessage, setErrorMessage] = useState("");
  var [gender, setGender] = useState("");
  var [age, setAge] = useState("");
  var [contactnumber, setContactNumber] = useState("");
  var [address, setAddress] = useState("");
  var navigate = useNavigate();

  function registerUser() {
    var user = {
      name: name,
      email: email,
      password: password,
      gender: gender,
      age: age,
      contactnumber: contactnumber,
      address: address,
    };

    axios
      .post("http://127.0.0.1:8080/patientsapi/signup", user)
      .then((response) => {
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(" "));
        } else {
          console.log(error.response.data)
          setErrorMessage("Failed to connect to API");
        }
      });
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          'url("https://tse3.mm.bing.net/th?id=OIP.KohJb_rW39c2oxjiO3Zx7wHaE3&pid=Api&P=0&h=220")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <h2 className="text-center mt-4">User Registration</h2>
            <form>
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
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                   <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option values="F">Female</option>
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
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={passwordConf}
                  onChange={(event) => setPasswordConf(event.target.value)}
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
                className="btn btn-primary float-right"
                onClick={registerUser}
              >
                Submit
              </button>

              <div className="text-center mt-3">
                <p>
                  Already have an account? <a href="/UserLogin">Login here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
