import types from '../actions/types';
import { FavoritesIds } from '../ts_types';

const initialState: FavoritesIds = {
  favoriteIds: []
};

const updateFavoriteReducer = (
  state = initialState,
  action: any
): FavoritesIds => {
  switch (action.type) {
    case types.UPDATE_FAVORITES:
      return { ...state, favoriteIds: action.payload };

    case types.CLEAR_ALL_FAVORITES:
      return initialState;

    default:
      return state;
  }
};

export default updateFavoriteReducer;
