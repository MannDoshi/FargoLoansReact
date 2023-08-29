import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
// import Login from "../pages/Login";
// import Logout from "../pages/Logout";
import EmployeeLogin from "../components/EmployeeLogin";
import Home from "../components/Home";
import EmployeeRegistration from "../components/EmployeeRegistration";
import Dashboard from "../components/Dashboard";
import ApplyForLoan from "../components/ApplyForLoan";
import EmployeeViewLoans from "../components/EmployeeViewLoans";
import EmployeeViewItems from "../components/EmployeeViewItems";
import AdminDashboard from "../components/AdminDashboard";
import AddEmployee from "../components/AddEmployee";
import AddLoanCard from "../components/AddLoanCard";
import AddItem from "../components/AddItem";
import ViewUpdateEmployees from "../components/ViewUpdateEmployees";
import ViewUpdateLoanCards from "../components/ViewUpdateLoanCards";
import ViewUpdateItems from "../components/ViewUpdateItems";
import ViewEmployee from "../components/ViewEmployee";
import ViewItem from "../components/ViewItem";
import ViewLoanCard from "../components/ViewLoanCard";
import AboutUs from "../components/AboutUs";
import ReviewLoan from "../components/ReviewLoan";
import { AdminRoute } from "./AdminRoute";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faEdit, faList, faHome, faSign, faSignOut, faCameraRetro, faBomb, faCoffee} from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit, faList, faHome, faSign, faSignOut, faCameraRetro, faBomb, faCoffee);


const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    
    {
      path: "/aboutus",
      element: <AboutUs/>,
    },
    {
      path: "/",
      element:<Home></Home>,
    },
    {
      path: "/signin",
      element: <EmployeeLogin/>,
    },
    {
      path: "/register",
      element: <EmployeeRegistration/>,
    },
    
  ];
  

  const routesForAdminOnly = [
    {
      path: "/",
      element: <AdminRoute />, // Wrap the component in AdminRoute
      children: [
        {
          path: "/adminDashboard",
          element: <AdminDashboard/>,
        },
        {
          path: "/addEmployee/:id",
          element: <AddEmployee/>,
        },
        {
          path: "/addLoanCard/:id",
          element: <AddLoanCard/>,
        },
        {
          path: "/addItem/:id",
          element: <AddItem/>,
        },
        {
          path: "/viewUpdateEmployees",
          element: <ViewUpdateEmployees/>,
        },
        {
          path: "/viewUpdateLoanCards",
          element: <ViewUpdateLoanCards/>,
        },
        {
          path: "/viewUpdateItems",
          element: <ViewUpdateItems/>,
        },
        {
          path: "/viewEmployee/:id",
          element: <ViewEmployee/>,
        },

        {
          path: "/viewItem/:id",
          element: <ViewItem/>,
        },
        {
          path: "/viewLoanCard/:id",
          element: <ViewLoanCard/>,
        },
        // {
        //   path: "/logout",
        //   element: <Logout/>,
        // },
        {
          path: "/aboutus",
          element: <AboutUs/>,
        },
      ],
    },
  ];
  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/register",
          element: <EmployeeRegistration/>,
        },
        {
          path: "/",
          element: <Home/>,
        },
        // {
        //   path: "/profile",
        //   element: <div>User Profile</div>,
        // },
        // // {
        // //   path: "/logout",
        // //   element: <Logout/>,
        // // },
         {
          path: "/dashboard",
          element: <Dashboard/>,
        },
         {
          path: "/applyForLoan",
          element: <ApplyForLoan/>,
        },
         {
          path: "/empViewLoans",
          element: <EmployeeViewLoans/>,
        },
        {
          path: "/empViewItems",
          element: <EmployeeViewItems/>,
        },
        {
          path: "/aboutus",
          element: <AboutUs/>,
        },
    
       

        // // {
        // //   path: "/logout",
        // //   element: <Logout/>,
        // // },


      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element:<Home></Home>,
    },
    {
      path: "/signin",
      element: <EmployeeLogin/>,
    },
    {
      path: "/register",
      element: <EmployeeRegistration/>,
    },
    {
      path: "/aboutus",
      element: <AboutUs/>,
    },
  ];
  
  

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ...routesForAdminOnly
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;

{/* <EmployeeRegistration></EmployeeRegistration> */}
                // <Route path='/' exact Component={Home}></Route>
                //   <Route path='register' Component={}></Route>
                //   <Route path='login' Component={CustomerLogin}></Route>
