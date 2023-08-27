import React from 'react'
// import './App.css';
import { BrowserRouter as Router,Routes , Route, Link } from 'react-router-dom';
import AboutUs from "./AboutUs";
import CustomerLogin from './EmployeeLogin';
import EmployeeRegistration from './EmployeeRegistration';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute';
import ApplyForLoan from './ApplyForLoan';
import EmployeeViewLoans from './EmployeeViewLoans';
import EmployeeViewItems from './EmployeeViewItems';
import AdminDashboard from './AdminDashboard';
import AddEmployee from './AddEmployee';
import AddLoanCard from './AddLoanCard';
import ViewUpdateLoanCards from './ViewUpdateLoanCards';
import ViewUpdateEmployees from './ViewUpdateEmployees';

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faEdit, faList, faHome, faSign, faSignOut, faCameraRetro, faBomb, faCoffee} from "@fortawesome/free-solid-svg-icons";
import AddItem from './AddItem';
import ViewUpdateItems from './ViewUpdateItems';
import ViewEmployee from './ViewEmployee';
import ViewItem from './ViewItem';
import ViewLoanCard from './ViewLoanCard';



export default function Home() {
  return (
    <div className="App">
      
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
       <h1>Home Loans</h1>
      
      <section>
        <div style={{ backgroundImage: "url(/images/pms1.webp)",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize:'cover', minHeight:'100vh',minWidth:'100vw'}}> 
        
            <Navbar></Navbar>
              {/* <Routes> */}
                  <Link to='signin'>signin</Link>
                  
                  {/* <Route
                  path="dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard/>
                    </PrivateRoute>
                  }
                  /> */}
                  {/* <PrivateRoute path="dashboard" element = {<Dashboard/>}/> */}
                   
              {/* </Routes> */}
         
        </div>
      </section>

       <footer className='footer'>
        <p>&copy; All Right Reserved to Wells Fargo</p>
      </footer> 
    </div>
  )
}
