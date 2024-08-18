import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const getUserFromLocalStorage = user ? JSON.parse(user) : null;

const initialState = {
  token: "",
  user: getUserFromLocalStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; accessToken: string }>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = "";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
