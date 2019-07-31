// @flow

import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAuthorized } from '../../actions/login';

import './home.css';

type HomeProps = {
  authorized: boolean,
  goToChart: () => any,
  goToChat: () => any,
  setAuthorized: (boolean) => void,
}

const Home = (props: HomeProps): React$Element<*> => (
  <div>
    <h1>Home</h1>
      <button
        type="button"
        className="home-page__button"
        onClick={() => props.goToChart()}
      >
        Go to chart
      </button>
      <button
        type="button"
        className="home-page__button"
        onClick={() => props.goToChat()}
      >
        Go to chat
      </button>
     <button
       type="button"
       className={`home-page__button ${!props.authorized && 'home-page__button_disabled'}`}
       disabled={!props.authorized}
       onClick={() => props.setAuthorized(false)}
     >
        Logout
     </button>
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
