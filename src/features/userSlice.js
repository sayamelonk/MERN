/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "saya",
    email: "saya@gmail.com",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {},
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
