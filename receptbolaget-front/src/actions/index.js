import axios from 'axios';

export const FETCH_RECIPES = 'fetch_recipes';
export const FETCH_INGREDIENTS= 'fetch_ingredients';
export const FETCH_RECIPE='fetch_recipe';

 export function fetchRecipes() {
  let request=  axios.get('http://localhost:3000/allarecept/');
  return {
    type: FETCH_RECIPES,
    payload: request
  };
}

export function fetchRecipe(id){
  let request = axios.get('http://localhost:3000/recept/'+id);
  return{
    type:FETCH_RECIPES,
    payload: request
  }
}

export function fetchIngredients(param) {
  let request=  axios.get('http://localhost:3000/allaingreds/'+param);
  return {
    type: FETCH_INGREDIENTS,
    payload: request
  };
}