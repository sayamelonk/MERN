/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
