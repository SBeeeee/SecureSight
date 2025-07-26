// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


const initialState = {
  token: token || null,
  user:  null,
  isAuthenticated: !!token,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
