/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const isLoggedIn = useSelector((state:any)=>state.auth.admin);
  console.log(isLoggedIn)
  return(  !isLoggedIn ? <Navigate to="/auth" /> : <Outlet />)
}
