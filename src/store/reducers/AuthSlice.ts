import { createSlice } from "@reduxjs/toolkit";

export interface Admin{
  username: string;
  id:string;
  isAdmin: boolean
}
export interface InitialStateInterface{
  admin: Admin | null
  isLoggedIn:boolean;
}

const initialState: InitialStateInterface ={
  admin: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')!) : {},
  isLoggedIn: localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem("isLoggedIn")!) : false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAdmin:(state,action)=>{
        state.admin = action.payload
        localStorage.setItem("admin",JSON.stringify(state.admin))
        state.isLoggedIn = true
        localStorage.setItem("isLoggedIn",JSON.stringify(state.isLoggedIn))
    },
    logout:(state)=>{
        state.admin = null
        localStorage.removeItem('admin')
        state.isLoggedIn = false
        localStorage.removeItem('isLoggedIn')
    },
  },
});

export const {loginAdmin, logout} = authSlice.actions
