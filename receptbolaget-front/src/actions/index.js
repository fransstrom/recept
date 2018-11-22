import axios from 'axios';

export const FETCH_RECIPES = 'fetch_recipes';
export const FETCH_INGREDIENTS= 'fetch_ingredients';


 export function fetchRecipes() {
  let request=  axios.get('http://localhost:3000/allarecept/');
  return {
    type: FETCH_RECIPES,
    payload: request
  };
}

export function fetchIngredients() {
  let request=  axios.get('http://localhost:3000/allaingreds/');
  return {
    type: FETCH_INGREDIENTS,
    payload: request
  };
}