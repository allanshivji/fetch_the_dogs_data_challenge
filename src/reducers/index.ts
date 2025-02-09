import { combineReducers } from 'redux';
import filtersReducer from './filter-reducer';
import updateFavoriteReducer from './update-favorite-reducer';

export default combineReducers({
  filters: filtersReducer,
  favorites: updateFavoriteReducer
})