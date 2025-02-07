import types from '../actions/types'
import { FiltersState } from '../ts_types'

const initialState: FiltersState = {
  selectedCities: [],
  selectedStates: [],
  selectedZipCodes: [],
};

const filtersReducer = (state = initialState, action: any): FiltersState => {
  switch (action.type) {
    case types.UPDATE_CITIES:
      return { ...state, selectedCities: action.payload };

    case types.UPDATE_STATES:
      return { ...state, selectedStates: action.payload };

    case types.UPDATE_ZIP_CODES:
      return { ...state, selectedZipCodes: action.payload };

    case types.CLEAR_ALL_FILTERS:
      return initialState;

    default:
      return state;
  }
};

export default filtersReducer;
