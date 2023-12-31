import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
  // const { token } = useAuth();
  // const user=localStorage.getItem("user");
  // const token=localStorage.getItem("token");
  const user=JSON.parse(localStorage.getItem("user"));
  const token=localStorage.getItem("token");
  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
