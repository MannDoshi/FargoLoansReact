import React from 'react'
import authService from '../service/auth.service';
// import { Navigation } from 'react-router-dom';
import { Navigate } from 'react-router';



export default function Navbar() {

  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
  // console.log(isLoggedIn.roles[0]);

  // const history = useNavigate();

  const handleLogout = (e) => {
    
    e.preventDefault();
    authService.logout();
    // history(`/`)
    return <Navigate to="/"/>
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">FargoLoans</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        {
          !isLoggedIn
          &&
          <li className="nav-item">
            <a className="nav-link" href="/signin">Login</a>
          </li>
        }
        {
          !isLoggedIn && <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li>
        }
        
        <li className="nav-item">
          <a className="nav-link" href="/aboutus">About Us</a>
        </li>
        {
          isLoggedIn && 
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>Logout</a>
        </li>
        }

        {
          (isLoggedIn&&(isLoggedIn.roles[0]==='ROLE_USER')) &&
          <li className="nav-item">
          <a className="nav-link" href="/dashboard">User Dashboard</a>
        </li>

        }
        {
          (isLoggedIn&&(isLoggedIn.roles[0]==='ROLE_ADMIN')) &&
          <li className="nav-item">
          <a className="nav-link" href="/adminDashboard">Admin Dashboard</a>
        </li>

        }
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}
