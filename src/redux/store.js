import { configureStore } from '@reduxjs/toolkit';
import heroSlice from './heroesSlice';

const store = configureStore({
  reducer: {
    heroes: heroSlice,
  },
});

export default store;