import { FETCH_RECIPES } from '../actions/index.js';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.payload.data;
    default:
      return state;
  }
}
