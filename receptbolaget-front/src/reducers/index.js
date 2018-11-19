import { combineReducers } from 'redux';
import recipeReducer from './reducers_recipes';

export default combineReducers({

  recipes: recipeReducer,
});
