import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const AdminRoute = () => {
//   const { token } = useAuth();
  // const { user ,token} = useAuth();
  const user=JSON.parse(localStorage.getItem("user"));
  const token=localStorage.getItem("token");

  if(token && user && user.roles  && user.roles[0] =="ROLE_ADMIN" ){
    return <Outlet />;
  }
  
  return <Navigate to="/signin" />;
};
