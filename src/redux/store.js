import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import heroSlice from "../redux/heroes/heroesSlice";
import authReducer from "../redux/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth'], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    heroes: heroSlice,
    auth: persistedAuthReducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['auth.register'], 
      },
    }),
});

const persistor = persistStore(store);

export default store;  
export { persistor };