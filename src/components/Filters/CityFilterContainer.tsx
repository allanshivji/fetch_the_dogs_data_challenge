import { connect } from 'react-redux';

import CityFilter from './CityFilter';

const mapStateToProps = (state: any, ownProps: any) => ({
  tempSelectedFilters: ownProps.tempSelectedFilters,
  setTempSelectedFilters: ownProps.setTempSelectedFilters,
  selectedCities: state.filters.selectedCities
});

export default connect(
  mapStateToProps,
  null
)(CityFilter);