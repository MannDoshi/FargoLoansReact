import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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


import AuthProvider from "./provider/authProvider";
import Routes from "./routes/index";

library.add(faTrash, faEdit, faList, faHome, faSign, faSignOut, faCameraRetro, faBomb, faCoffee);


// function App() {
//   return (
//     <AuthProvider>
//       <Routes >
        
//       </Routes>
//     </AuthProvider>
//   );
// }



function App() {
  return (
    <AuthProvider>
    <h1>Fargo Loans</h1>
      <Routes >
    
    </Routes>
    </AuthProvider>
  );
}

export default App;
