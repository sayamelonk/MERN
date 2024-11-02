/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload.data;

      // set nilai dari state
      state.user = user;

      // simpan ke local storage
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logout Berhasil");
    },
    registerUser: (state, action) => {
      const user = action.payload.data;
      state.user = user;

      // simpan ke local storage
      localStorage.setItem("user", JSON.stringify(user));
      // toast.success("Register Berhasil");
    },
  },
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;

export default userSlice.reducer;
