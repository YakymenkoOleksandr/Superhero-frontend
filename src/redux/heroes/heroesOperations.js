import axios from "axios";
import { fetchHeroesSuccess, fetchHeroesFailure, updateHero } from "./heroesSlice"

const BASE_URL = "https://superhero-backend-vrcc.onrender.com";

export const fetchSuperHeroes = (page, accessToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/superheros`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            page,
          },
        }
      );
      dispatch(fetchHeroesSuccess(response.data));
    } catch (error) {
      console.error("Error fetching superheroes:", error);
      dispatch(fetchHeroesFailure(error.message));
    }
  };
};

export const updateHeroInfo = (id, updatedData, accessToken) => async (dispatch) => {
 // console.log(`Updating hero at URL: ${BASE_URL}/${id}`);
 // console.log("Payload:", updatedData);

  try {
    const response = await axios.patch(`${BASE_URL}/superheros/superheros/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(updateHero(response.data)); 
  } catch (error) {
    console.error("Error updating superhero:", error.response?.data || error.message);
    throw error;
  }
};
