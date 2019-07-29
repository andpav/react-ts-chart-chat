import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Main = props => (
  <div>
    <h1>Main</h1>
    <p>
      <button onClick={() => props.changePage()}>
        Go to chart
      </button>
    </p>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/chart'),
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps
)(Main);
