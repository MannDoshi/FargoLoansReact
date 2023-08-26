import React, { Component } from "react";
// import { Routes, Route, Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import AboutUs from './components/AboutUs';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegistration from './components/CustomerRegistration';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import AuthService from "./service/auth.service";
import EventBus from "./common/EventBus";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      redirectToLogin:false
    };
  }

  componentDidMount() {
    const user = AuthService.getAuthUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }else{
      this.setState({
        redirectToLogin:false
      });
      
    }
    
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    // if(this.state.redirectToLogin){
    //   // return <Navigate to="/login" />
    //   return (<Navigate to="/login" replace={true} />)
    // }
    return (
      <div className="App">
      
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
     <h1>Fargo Loans</h1>
    
    <section>
      <div style={{ backgroundImage: "url(/images/pms1.webp)",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize:'cover', minHeight:'100vh',minWidth:'100vw'}}> 
       <Router>
       {this.state.redirectToLogin && <Navigate to="/login" replace={true} />}
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
      // <div>
      //   <nav className="navbar navbar-expand navbar-dark bg-dark">
      //     <Link to={"/"} className="navbar-brand">
      //       bezKoder
      //     </Link>
      //     <div className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <Link to={"/home"} className="nav-link">
      //           Home
      //         </Link>
      //       </li>

      //       {showModeratorBoard && (
      //         <li className="nav-item">
      //           <Link to={"/mod"} className="nav-link">
      //             Moderator Board
      //           </Link>
      //         </li>
      //       )}

      //       {showAdminBoard && (
      //         <li className="nav-item">
      //           <Link to={"/admin"} className="nav-link">
      //             Admin Board
      //           </Link>
      //         </li>
      //       )}

      //       {currentUser && (
      //         <li className="nav-item">
      //           <Link to={"/user"} className="nav-link">
      //             User
      //           </Link>
      //         </li>
      //       )}
      //     </div>

      //     {currentUser ? (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link to={"/profile"} className="nav-link">
      //             {currentUser.username}
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <a href="/login" className="nav-link" onClick={this.logOut}>
      //             LogOut
      //           </a>
      //         </li>
      //       </div>
      //     ) : (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link to={"/login"} className="nav-link">
      //             Login
      //           </Link>
      //         </li>

      //         <li className="nav-item">
      //           <Link to={"/register"} className="nav-link">
      //             Sign Up
      //           </Link>
      //         </li>
      //       </div>
      //     )}
      //   </nav>

      //   <div className="container mt-3">
      //     <Routes>
      //       <Route path="/" element={<Home />} />
      //       <Route path="/home" element={<Home />} />
      //       <Route path="/login" element={<Login />} />
      //       <Route path="/register" element={<Register />} />
      //       <Route path="/profile" element={<Profile />} />
      //       <Route path="/user" element={<BoardUser />} />
      //       <Route path="/mod" element={<BoardModerator />} />
      //       <Route path="/admin" element={<BoardAdmin />} />
      //     </Routes>
      //   </div>

      //   {/* <AuthVerify logOut={this.logOut}/> */}
      // </div>
    );
  }
}

export default App;