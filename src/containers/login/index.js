// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  signIn,
  setLogin,
  setPassword,
  setError,
} from '../../actions/login';

import './login.css';

type LoginProps = {
  authorized: boolean,
  login: string,
  password: string,
  error: boolean,
  setLogin: (string) => void,
  setPassword: (string) => void,
  setError: (boolean) => void,
  signIn: () => void,
}

class Login extends Component<{}, LoginProps> {
  setLogin = (event: SyntheticInputEvent) => {
    this.props.setLogin(event.target.value);
    this.props.setError(false);
  };

  setPassword = (event: SyntheticInputEvent) => {
    this.props.setPassword(event.target.value);
    this.props.setError(false);
  };

  render(): React$Element<*> {
    return (
      <div className="login-page">
        <h1>Login</h1>
        <input
          className="login-page__input"
          placeholder="username"
          onChange={(e: SyntheticInputEvent) => this.setLogin(e)}
          value={this.props.login}
        />
        <input
          className="login-page__input"
          placeholder="password"
          onChange={(e: SyntheticInputEvent) => this.setPassword(e)}
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
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
