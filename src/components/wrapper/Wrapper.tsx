/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import SideNav from "../sidenav/SideNav";
import { useEffect } from "react";


export default function Wrapper() {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/account-management')
  },[])
  return (
    <div>
      <SideNav/>
      <Footer/>
      <Outlet/>
    </div>
  )
}
