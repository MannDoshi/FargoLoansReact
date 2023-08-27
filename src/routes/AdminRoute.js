import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const AdminRoute = () => {
//   const { token } = useAuth();
  const { user ,token} = useAuth();

  if(token && user && user.roles  && user.roles[0]==="ROLE_ADMIN" ){
    return <Outlet />;
  }
  
  return <Navigate to="/signin" />;
};
