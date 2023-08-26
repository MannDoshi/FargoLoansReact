import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import CustomerLogin from './components/EmployeeLogin';
import EmployeeRegistration from './components/EmployeeRegistration';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ApplyForLoan from './components/ApplyForLoan';
import EmployeeViewLoans from './components/EmployeeViewLoans';
import EmployeeViewItems from './components/EmployeeViewItems';
import AdminDashboard from './components/AdminDashboard';
import AddEmployee from './components/AddEmployee';
import AddLoanCard from './components/AddLoanCard';
import ViewUpdateLoanCards from './components/ViewUpdateLoanCards';
import ViewUpdateEmployees from './components/ViewUpdateEmployees';

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faEdit, faList, faHome, faSign, faSignOut, faCameraRetro, faBomb, faCoffee} from "@fortawesome/free-solid-svg-icons";
import AddItem from './components/AddItem';
import ViewUpdateItems from './components/ViewUpdateItems';
import ViewEmployee from './components/ViewEmployee';
import ViewItem from './components/ViewItem';
import ViewLoanCard from './components/ViewLoanCard';

library.add(faTrash, faEdit, faList, faHome, faSign, faSignOut, faCameraRetro, faBomb, faCoffee);

function App() {
  return (
    <div className="App">
      
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
       <h1>Fargo Loans</h1>
      
      <section>
        <div style={{ backgroundImage: "url(/images/pms1.webp)",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize:'cover', minHeight:'100vh',minWidth:'100vw'}}> 
         <Router>
            <Navbar></Navbar>
              <Routes>
                  <Route path='/' exact Component={Home}></Route>
                  <Route path='register' Component={EmployeeRegistration}></Route>
                  <Route path='login' Component={CustomerLogin}></Route>
                  <Route path='dashboard' Component={Dashboard}></Route>
                  <Route path='aboutus' Component={AboutUs}></Route>
                  <Route path='applyForLoan' Component={ApplyForLoan}></Route>
                  <Route path='empViewLoans' Component={EmployeeViewLoans}></Route>
                  <Route path='empViewItems' Component={EmployeeViewItems}></Route>
                  <Route path='adminDashboard' Component={AdminDashboard}></Route>
                  <Route path='addEmployee' Component={AddEmployee}></Route>
                  <Route path='addLoanCard' Component={AddLoanCard}></Route>
                  <Route path='addItem' Component={AddItem}></Route>
                  <Route path='viewUpdateEmployees' Component={ViewUpdateEmployees}></Route>
                  <Route path='viewUpdateLoanCards' Component={ViewUpdateLoanCards}></Route>
                  <Route path='viewUpdateItems' Component={ViewUpdateItems}></Route>
                  <Route path='viewEmployee/:id' Component={ViewEmployee}></Route>
                  <Route path='viewItem/:id' Component={ViewItem}></Route>
                  <Route path='viewLoanCard/:id' Component={ViewLoanCard}></Route>
                  {/* <Route
                  path="dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard/>
                    </PrivateRoute>
                  }
                  /> */}
                  {/* <PrivateRoute path="dashboard" element = {<Dashboard/>}/> */}
                   
              </Routes>
          </Router> 
        </div>
      </section>

       <footer className='footer'>
        <p>&copy; All Right Reserved to Wells Fargo</p>
      </footer> 
    </div>
  );
}

export default App;
