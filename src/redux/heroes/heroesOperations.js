import axios from "axios";
import {fetchHeroesSuccess, fetchHeroesFailure} from "./heroesSlice"

export const fetchSuperHeroes = (page, accessToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://superhero-backend-vrcc.onrender.com/superheros",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            page,
          },
        }
      );
      console.log(response.data);
      
      dispatch(fetchHeroesSuccess(response.data));
    } catch (error) {
      console.error("Error fetching superheroes:", error);
      dispatch(fetchHeroesFailure(error.message));
    }
  };
};