import React from 'react';
import { useLocation, Route, Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {

  const isAuth = localStorage.getItem("isAuth");
  console.log(isAuth);
  
  return isAuth ? <Navigate to="/dashboard"/> : <h1>heloo</h1>
    
    // const location = useLocation();

    // const isAuth = localStorage.getItem("isAuth");

    // return (
    //     <Route
    //         {...rest}
    //         render={() =>
    //             isAuth ? (
    //                 // Logged in, render the children
    //                 children
    //             ) : (
    //                     // Not logged in, redirect to auth page
    //                     <Navigate to={{ pathname: "/login", state: { from: location } }} />
    //                 )
    //         }
    //     />
    // );
};

export default PrivateRoute;