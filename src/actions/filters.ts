import types from './types';
import { SelectOption } from '../ts_types';

export const updateCities = (cities: SelectOption[]) => ({
  type: types.UPDATE_CITIES,
  payload: cities
});

export const updateStates = (states: SelectOption[]) => ({
  type: types.UPDATE_STATES,
  payload: states
});

export const updateZipCodes = (zipCodes: SelectOption[]) => ({
  type: types.UPDATE_ZIP_CODES,
  payload: zipCodes
});

export const updateGeoLocations = (geoLocations: SelectOption[]) => ({
  type: types.UPDATE_GEO_LOCATIONS,
  payload: geoLocations
});

export const clearLocationFilters = () => ({
  type: types.CLEAR_ALL_FILTERS
});
