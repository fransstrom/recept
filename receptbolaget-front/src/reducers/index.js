import { combineReducers } from 'redux';
import recipeReducer from './reducers_recipes';
import ingredientReducer from './reducers_ingredients';
import { reducer as formreducer } from 'redux-form';

export default combineReducers({
  ingredients: ingredientReducer,
  recipes: recipeReducer,
  form: formreducer
});
