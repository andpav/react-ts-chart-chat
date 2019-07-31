// @flow

import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  signIn,
  setLogin,
  setPassword,
  setError,
} from '../../actions/login';

import './login.css';

class Login extends Component {
  componentDidMount() {
    if (this.props.authorized) {
      this.props.changePage();
    }
  }

  componentDidUpdate() {
    if (this.props.authorized) {
      this.props.changePage();
    }
  }

  setLogin = (event) => {
    this.props.setLogin(event.target.value);
    this.props.setError(false);
  };

  setPassword = (event) => {
    this.props.setPassword(event.target.value);
    this.props.setError(false);
  };

  render() {
    return (
      <div className="login-page">
        <h1>Login</h1>
        <input
          className="login-page__input"
          placeholder="username"
          onChange={e => this.setLogin(e)}
          value={this.props.login}
        />
        <input
          className="login-page__input"
          placeholder="password"
          onChange={e => this.setPassword(e)}
          type="password"
          value={this.props.password}
        />
        <div className="login-page__button-wrapper">
          <button
            type="button"
            className="login-page__button"
            onClick={() => this.props.signIn()}
          >
            Login
          </button>
          {this.props.error && <p className="login-page__error">something went wrong</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginReducer.login,
  password: state.loginReducer.password,
  authorized: state.loginReducer.authorized,
  error: state.loginReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signIn,
    setLogin,
    setPassword,
    setError,
    changePage: () => push('/chart'),
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
