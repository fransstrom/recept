import axios from 'axios';

export const FETCH_RECIPES = 'fetch_recipes';


 export function fetchRecipes() {
  let request=  axios.get('http://localhost:3000/allarecept/');
  return {
    type: FETCH_RECIPES,
    payload: request
  };
}
