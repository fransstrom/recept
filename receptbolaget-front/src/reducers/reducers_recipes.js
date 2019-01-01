import { FETCH_RECIPES, FETCH_RECIPE } from '../actions/index.js';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RECIPE:
    // const recipe= action.payload.data;
    // const newState= {...state, };
    // newState[recipe._id]=recipe;
    // return newState;
return{...state, [action.payload.data._id]:action.payload}

    case FETCH_RECIPES:
      return action.payload.data;
    default:
      return state;
  }
}

