import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ChartComponent from '../../components/chart';

import { setChartConnection } from '../../actions/chart';

import { chartPoint } from '../../typing/types';

type ChartProps = {
  chartData: Array<chartPoint>;
  setChartConnection: () => void;
}

class Chart extends React.Component<ChartProps, {}> {
  componentDidMount(): void {
    this.props.setChartConnection();
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Chart</h1>
        <ChartComponent data={this.props.chartData} />
      </div>
    );
  }
}

// @ts-ignore
const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
  chartData: state.chartReducer.data,
});

// @ts-ignore
const mapDispatchToProps = dispatch => bindActionCreators({
  setChartConnection,
  changePage: () => push('/login'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chart);
