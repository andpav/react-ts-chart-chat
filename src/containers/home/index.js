import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Main = props => (
  <div>
    <h1>Main</h1>
      <button onClick={() => props.goToChart()}>
        Go to chart
      </button>
      <button onClick={() => props.goToChat()}>
        Go to chat
      </button>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToChart: () => push('/chart'),
      goToChat: () => push('/chat'),
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps
)(Main);
