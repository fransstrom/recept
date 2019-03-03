import axios from 'axios';

export const FETCH_RECIPES = 'fetch_recipes';
export const FETCH_INGREDIENTS= 'fetch_ingredients';
export const FETCH_RECIPE='fetch_recipe';

 export function fetchRecipes() {
  let request=  axios.get('https://api.mrpwr.se/allarecept/');
  return {
    type: FETCH_RECIPES,
    payload: request
  };
}

export function fetchRecipe(id){
  let request = axios.get('https://api.mrpwr.se/recept/'+id);
  return{
    type:FETCH_RECIPES,
    payload: request
  }
}

export function fetchIngredients(param) {
  let request=  axios.get('https://api.mrpwr.se/allaingreds/'+param);
  return {
    type: FETCH_INGREDIENTS,
    payload: request
  };
}