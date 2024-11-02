import {
  fetchHeroesStart,
  fetchHeroesSuccess,
  fetchHeroesFailure,
  addHero,
  removeHero,
  updateHero,
} from './heroesSlice';

export const fetchHeroes = (page = 1) => async dispatch => {
  dispatch(fetchHeroesStart());
  
  try {
    const response = await fetch(`https://superhero-backend-vrcc.onrender.com/superheros?page=${page}`);
      const data = await response.json();
    const totalPage = Math.ceil(data.data.totalItems / 5);
    dispatch(fetchHeroesSuccess({ heroes: data.data.data, totalPage })); 
  } catch (error) {
    dispatch(fetchHeroesFailure(error.message));
  }
};

export const createHero = (heroData) => async dispatch => {
  // Логіка для створення героя
  dispatch(addHero(heroData)); // Залежно від вашої логіки
};

export const deleteHero = (heroId) => async dispatch => {
  // Логіка для видалення героя
  dispatch(removeHero(heroId)); // Залежно від вашої логіки
};

export const editHero = (heroData) => async dispatch => {
  // Логіка для оновлення героя
  dispatch(updateHero(heroData)); // Залежно від вашої логіки
};