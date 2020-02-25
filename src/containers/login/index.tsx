import React from 'react';
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
import Input from '../../components/input';

import './login.css';

type LoginProps = {
  authorized: boolean;
  login: string;
  password: string;
  error: boolean;
  setLogin: (login: string) => void;
  setPassword: (password: string) => void;
  setError: (isError: boolean) => void;
  signIn: () => void;
}

class Login extends React.Component<LoginProps, {}> {
  setLogin = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.setLogin(event.currentTarget.value);
    this.props.setError(false);
  };

  setPassword = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.setPassword(event.currentTarget.value);
    this.props.setError(false);
  };

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === keys.Enter) {
      this.props.signIn();
    }
  };

  render(): JSX.Element {
    return (
      // @ts-ignore
      <div className="login-page" onKeyDown={this.onKeyDown}>
        <h1>Login</h1>
        <Input
          placeholder="username"
          onChange={this.setLogin}
          value={this.props.login}
          autoFocus
        />
        <Input
          placeholder="password"
          onChange={this.setPassword}
          // @ts-ignore
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

// @ts-ignore
const mapStateToProps = state => ({
  login: state.loginReducer.login,
  password: state.loginReducer.password,
  authorized: state.loginReducer.authorized,
  error: state.loginReducer.error,
});

// @ts-ignore
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
