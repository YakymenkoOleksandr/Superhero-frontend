import {
  fetchHeroesStart,
  fetchHeroesSuccess,
  fetchHeroesFailure,
  addHero,
  removeHero,
  updateHero,
} from './heroesSlice';

export const fetchHeroes = () => async dispatch => {
  dispatch(fetchHeroesStart());
  
  try {
    const response = await fetch('https://your-api-url.com/api/superheros');
    const data = await response.json();
    dispatch(fetchHeroesSuccess(data));
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