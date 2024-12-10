import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { token, persistType } = action.payload;
      state.accessToken = token;

      // Збереження в Local Storage або Session Storage
      if (persistType === "local") {
        localStorage.setItem("accessToken", token);
      } else {
        sessionStorage.setItem("accessToken", token);
      }
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;