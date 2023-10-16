import { createSlice } from "@reduxjs/toolkit";
import { ClientType } from "../../types";

type InitialStateType = {
  clients: ClientType[]
}
// Attempt to retrieve the clients data from localStorage
// const savedClients = localStorage.getItem("client");
const initialState:InitialStateType = {
  clients: localStorage.getItem("client") ? JSON.parse(localStorage.getItem("client")!) : [],
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    getAllClients: (state, action) => {
      state.clients = action.payload;
      localStorage.setItem("client", JSON.stringify(action.payload));
    },
    getAllConfirmedClients: (state, action) => {
      const filteredClients = state.clients.filter((client)=>client.isConfirmed)
      state.clients = filteredClients.slice();
    },
  },
});

export const { getAllClients,getAllConfirmedClients } = clientSlice.actions;