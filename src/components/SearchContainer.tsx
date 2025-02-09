import { connect } from 'react-redux';
import {
  updateCities,
  updateStates,
  updateZipCodes,
  updateGeoLocations,
  updateFavorites,
  clearLocationFilters,
  clearAllFavorites
} from '../actions';

import { SelectOption } from '../ts_types';
import SearchPage from './SearchPage';

const mapStateToProps = (state: any, ownProps: any) => ({
  stateFilters: state.filters,
  favoritesFromState: state.favorites
});

const mapDispatchStateToProps = (dispatch: any) => ({
  updateCities: (cities: SelectOption[]) => dispatch(updateCities(cities)),
  updateStates: (states: SelectOption[]) => dispatch(updateStates(states)),
  updateZipCodes: (zipCodes: SelectOption[]) =>
    dispatch(updateZipCodes(zipCodes)),
  updateGeoLocations: (geoLocations: SelectOption[]) =>
    dispatch(updateGeoLocations(geoLocations)),
  updateFavorites: (favoriteIds: string[]) =>
    dispatch(updateFavorites(favoriteIds)),
  clearLocationFilters: () => dispatch(clearLocationFilters()),
  clearAllFavorites: () => dispatch(clearAllFavorites())
});

export default connect(mapStateToProps, mapDispatchStateToProps)(SearchPage);
