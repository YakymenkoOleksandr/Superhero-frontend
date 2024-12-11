import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroesSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    heroes: heroSlice,
    auth: authReducer,
  },
});

export default store;
