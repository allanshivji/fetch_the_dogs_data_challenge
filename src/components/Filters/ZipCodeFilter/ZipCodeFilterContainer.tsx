import { connect } from 'react-redux';

import ZipCodeFilter from '../ZipCodeFilter/ZipCodeFilter';

const mapStateToProps = (state: any, ownProps: any) => ({
  tempSelectedFilters: ownProps.tempSelectedFilters,
  setTempSelectedFilters: ownProps.setTempSelectedFilters,
  selectedZipCodes: state.filters.selectedZipCodes
});

export default connect(mapStateToProps, null)(ZipCodeFilter);
