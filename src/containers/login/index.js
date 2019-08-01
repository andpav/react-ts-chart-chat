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
import keys from '../../constants/keys';
import Button from '../../components/button';

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

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === keys.Enter) {
      this.props.signIn();
    }
  };

  render(): React$Element<*> {
    return (
      <div className="login-page" onKeyDown={this.onKeyDown}>
        <h1>Login</h1>
        <input
          className="login-page__input"
          placeholder="username"
          onChange={(e: SyntheticInputEvent) => this.setLogin(e)}
          value={this.props.login}
          autoFocus
        />
        <input
          className="login-page__input"
          placeholder="password"
          onChange={(e: SyntheticInputEvent) => this.setPassword(e)}
          type="password"
          value={this.props.password}
        />
        <Button
          text="submit"
          onClick={this.props.signIn}
          error={this.props.error}
        />
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
