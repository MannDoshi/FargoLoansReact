import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegistration from './components/CustomerRegistration';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

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
                  <Route path='register' Component={CustomerRegistration}></Route>
                  <Route path='login' Component={CustomerLogin}></Route>
                  {/* <Route path='dashboard' Component={Dashboard}></Route> */}
                  <Route path='aboutus' Component={AboutUs}></Route>
                  <Route
                  path="dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard/>
                    </PrivateRoute>
                  }
                  />
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
