import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  loading: false,
  error: null,
  totalPage: 0,
};

const heroSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    fetchHeroesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchHeroesSuccess(state, action) {
      state.loading = false;
      state.heroes = action.payload.data.data;
      console.log(state.heroes);
      
      state.totalPage = action.payload.data.totalPages;
      console.log(state.totalPage);
      
    },
    fetchHeroesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateHero(state, action) {
      const index = state.heroes.findIndex(
        (hero) => hero._id === action.payload._id
      );
      if (index !== -1) {
        state.heroes[index] = action.payload;
      }
    },
  },
});

export const {
  fetchHeroesStart,
  fetchHeroesSuccess,
  fetchHeroesFailure,
  updateHero,
} = heroSlice.actions;

export default heroSlice.reducer;