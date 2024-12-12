import {
  fetchHeroesStart,
  fetchHeroesSuccess,
  fetchHeroesFailure,
} from "./heroes/heroesSlice";

export const fetchHeroes =
  (page = 1) =>
  async (dispatch, getState) => {
    dispatch(fetchHeroesStart());

    const accessToken = getState().auth.accessToken;

    try {
      const response = await fetch(
        `https://superhero-backend-vrcc.onrender.com/superheros?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const totalPage = Math.ceil(data.data.totalItems / 5);
      dispatch(fetchHeroesSuccess({ heroes: data.data.data, totalPage }));
    } catch (error) {
      dispatch(fetchHeroesFailure(error.message));
    }
  };
