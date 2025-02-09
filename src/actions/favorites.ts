import types from './types';

export const updateFavorites = (favorites: string[]) => ({
  type: types.UPDATE_FAVORITES,
  payload: favorites,
});

export const clearAllFavorites = () => ({
  type: types.CLEAR_ALL_FAVORITES
})