import { connect } from 'react-redux';

import StateFilter from '../StateFilter/StateFilter';

const mapStateToProps = (state: any, ownProps: any) => ({
  tempSelectedFilters: ownProps.tempSelectedFilters,
  setTempSelectedFilters: ownProps.setTempSelectedFilters,
  selectedStates: state.filters.selectedStates
});

export default connect(mapStateToProps, null)(StateFilter);
