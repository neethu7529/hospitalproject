import { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function attemptLogin() {
        const userCredentials = {
            email: email,
            password: password,
          };
      
          axios.post("http://127.0.0.1:8080/patientsapi/login",userCredentials)
      .then(response=>{
          setErrorMessage('');
          localStorage.setItem("authToken", response.data.token);  // Example
          // Redirect to the homepage or dashboard
          navigate("/Doctorlist");
        })
        .catch((error) => {
          console.log(error);  // Log the full error for debugging
          if (error.response && error.response.data && error.response.data.message) {
            setErrorMessage(error.response.data.message);  // Display error message from server
          } else {
            setErrorMessage("Failed to connect to API");
          }
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100"
                style={{
                    backgroundImage: 'url("https://tse3.mm.bing.net/th?id=OIP.93ou9-5IQQOSC_SEFuk9vgHaDS&pid=Api&P=0&h=220")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center mb-4">User Login</h2>
                    {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary w-100" onClick={attemptLogin}>Login</button>
                    </div>
                    <div className="text-center mt-3">
                        <p>
                            Don't have an account? <a href="/register">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
