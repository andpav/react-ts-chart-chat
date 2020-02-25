import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAuthorized } from '../../actions/login';
import Button from '../../components/button';

import './home.css';

type HomeProps = {
  authorized: boolean;
  goToChart: () => any;
  goToChat: () => any;
  setAuthorized: (isAuthorized: boolean) => void;
}

const Home = (props: HomeProps): JSX.Element => (
  <div className="home-page">
    <h1>Home</h1>

    <p>You can use for login: 'user', 'user2' with password '12345'</p>

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
      // @ts-ignore
      onClick={props.setAuthorized}
    />
  </div>
);

// @ts-ignore
const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
});

// @ts-ignore
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
