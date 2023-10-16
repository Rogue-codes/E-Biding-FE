/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
    const isLoggedIn = useSelector((state:any)=>state.auth.admin);
    const isAuthenticated = isLoggedIn 
  console.log(isLoggedIn)
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
