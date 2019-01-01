import { combineReducers } from 'redux';
import recipesReducer from './reducers_recipes';
import recipeReducer from './reducers_recipes';
import ingredientReducer from './reducers_ingredients';


export default combineReducers({
  ingredients: ingredientReducer,
  recipes: recipesReducer,
  recipe: recipeReducer
});
