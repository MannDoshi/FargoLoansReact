import React, { useState } from "react";
import AuthenticationService from "../service/AuthenticationService";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";

const EmployeeLogin = () => {
  const history = useNavigate(); // Object to navigate

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    const employee = {
      username,
      password,
    };

    /*await is usually used to unwrap promises by passing a Promise as the expression. 
  Using await pauses the execution of its surrounding async function until the promise is 
  settled (that is, fulfilled or rejected).
  When execution resumes, the value of the await expression becomes that of the 
  fulfilled promise.
  
  The Promise object represents the eventual completion (or failure) of an asynchronous 
  operation and its resulting value
     */
    console.log("authService calling ");
    authService
      .login(username, password)
      .then((data) => {
        console.log("authService", data);
      })
      .then(() => {
        history("/");
      })
      .catch((error) => {
        console.error("a login error", error);
        setErrorMessage("An error occurred during login.");
      });
  };

  return (
      <div className="container">
          <br></br>
        <h2>Employee Login</h2>
        
            <div className="form-group w-50 container">
                <label>Email</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
            <div className="form-group w-50 container">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
    
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        </div> 
      
    );
};

export default EmployeeLogin;