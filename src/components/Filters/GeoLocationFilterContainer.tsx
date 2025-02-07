import { connect } from 'react-redux';

import GeoLocationFilter from './GeoLocationFilter';

const mapStateToProps = (state: any, ownProps: any) => ({
  tempSelectedFilters: ownProps.tempSelectedFilters,
  setTempSelectedFilters: ownProps.setTempSelectedFilters,
  selectedGeoLocations: state.filters.selectedGeoLocations
});

export default connect(
  mapStateToProps,
  null
)(GeoLocationFilter);