import { connect } from 'react-redux';
import { updateCities, updateStates, updateZipCodes, updateGeoLocations } from '../actions';

import { SelectOption } from '../ts_types';
import SearchPage from './SearchPage';

const mapStateToProps = (state: any, ownProps: any) => ({
  stateFilters: state.filters
});

const mapDispatchStateToProps = (dispatch: any) => ({
  updateCities: (cities: SelectOption[]) => dispatch(updateCities(cities)),
  updateStates: (states: SelectOption[]) => dispatch(updateStates(states)),
  updateZipCodes: (zipCodes: SelectOption[]) => dispatch(updateZipCodes(zipCodes)),
  updateGeoLocations: (geoLocations: SelectOption[]) => dispatch(updateGeoLocations(geoLocations))
})

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(SearchPage);