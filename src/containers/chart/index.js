// @flow

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
    this.props.setChartConnection();
  }

  render() {
    return (
      <div>
        <h1>Chart</h1>
        <ChartComponent data={this.props.chartData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
  chartData: state.chartReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setChartConnection,
  changePage: () => push('/login'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chart);
