import { combineReducers } from 'redux';
import filtersReducer from './filter-reducer'

export default combineReducers({
  filters: filtersReducer,
})