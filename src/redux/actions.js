import {
  fetchHeroesStart,
  fetchHeroesSuccess,
  fetchHeroesFailure,
} from "./heroesSlice";

export const fetchHeroes =
  (page = 1) =>
  async (dispatch) => {
    dispatch(fetchHeroesStart());

    try {
      const response = await fetch(
        `https://superhero-backend-vrcc.onrender.com/superheros?page=${page}`
      );
      const data = await response.json();
      const totalPage = Math.ceil(data.data.totalItems / 5);
      dispatch(fetchHeroesSuccess({ heroes: data.data.data, totalPage }));
    } catch (error) {
      dispatch(fetchHeroesFailure(error.message));
    }
  };
