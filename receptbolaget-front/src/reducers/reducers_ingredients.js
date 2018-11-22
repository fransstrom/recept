import { FETCH_INGREDIENTS } from '../actions/index.js';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_INGREDIENTS:
      return action.payload.data;
    default:
      return state;
  }
}
