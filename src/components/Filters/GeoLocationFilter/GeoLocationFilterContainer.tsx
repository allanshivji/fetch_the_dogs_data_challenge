import { connect } from 'react-redux';

import GeoLocationFilter from '../GeoLocationFilter/GeoLocationFilter';

const mapStateToProps = (state: any, ownProps: any) => ({
  tempSelectedFilters: ownProps.tempSelectedFilters,
  setTempSelectedFilters: ownProps.setTempSelectedFilters
});

export default connect(mapStateToProps, null)(GeoLocationFilter);
