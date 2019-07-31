import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ChartComponent from '../../components/chart';

import {
  setChartConnection,
} from '../../actions/chart';

class Chart extends Component {
  componentDidMount() {
    // move to saga

    if (!this.props.authorized) {
      this.props.changePage();

      return;
    }

    this.props.setChartConnection();
  }

  componentDidUpdate() {
    // move to saga

    if (!this.props.authorized) {
      this.props.changePage();
    }
  }

  render() {
    return (
      <div>
        <h1>Chart</h1>
        <ChartComponent data={this.props.chartData} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
  chartData: state.chartReducer.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      setChartConnection,
      changePage: () => push('/login'),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)
