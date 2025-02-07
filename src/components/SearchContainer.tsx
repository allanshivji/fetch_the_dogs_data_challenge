import { connect } from 'react-redux';

import SearchPage from './Search';

const mapStateToProps = (state: any, ownProps: any) => ({
  stateFilters: state.filters
});

export default connect(
  mapStateToProps,
  null
)(SearchPage);