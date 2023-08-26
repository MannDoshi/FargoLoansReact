import React, { useState } from "react";
import AuthenticationService from "../service/AuthenticationService";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";

const CustomerLogin = () => {
  const history = useNavigate(); // Object to navigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    const customer = {
      email,
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
    try {
      AuthService.login(email, password).then(
        () => {
          // this.props.router.navigate("/profile");
          // window.location.reload();
          setSuccessMessage("Login successful. Redirecting...");
          history("/dashboard");
        },
        (error) => {
          setErrorMessage("Invalid email or password.");
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.error("Login error", error);
          setErrorMessage("An error occurred during login.");
        }
      );
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div className="container">
     <h2> Customer Login </h2>
      <div className="form-group w-50">
        <label> Email </label>{" "}
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
      </div>{" "}
      <div className="form-group w-50">
        <label> Password </label>{" "}
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        {" "}
        Login{" "}
      </button>{" "}
      {errorMessage && <p className="error-message"> {errorMessage} </p>}{" "}
      {successMessage && <p className="success-message"> {successMessage} </p>}{" "}
    </div>
  );
};

export default CustomerLogin;
