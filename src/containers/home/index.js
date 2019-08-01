// @flow

import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAuthorized } from '../../actions/login';
import Button from '../../components/button';

import './home.css';

type HomeProps = {
  authorized: boolean,
  goToChart: () => any,
  goToChat: () => any,
  setAuthorized: (boolean) => void,
}

const Home = (props: HomeProps): React$Element<*> => (
  <div className="home-page">
    <h1>Home</h1>
      <Button
        text="Go to chart"
        className="home-page__button"
        onClick={props.goToChart}
      />
      <Button
        text="Go to chat"
        className="home-page__button"
        onClick={props.goToChat}
      />
      <Button
        text="Logout"
        className="home-page__button"
        disabled={!props.authorized}
        onClick={props.setAuthorized}
      />
  </div>
);

const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    goToChart: () => push('/chart'),
    goToChat: () => push('/chat'),
    setAuthorized,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
