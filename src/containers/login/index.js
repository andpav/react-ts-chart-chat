import React, {Component} from 'react'
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  signIn,
  setLogin,
  setPassword,
  setError,
} from '../../actions/login'

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
      <div>
        <h1>Login</h1>
        <p>username</p><input onChange={(e) => this.setLogin(e)} value={this.props.login} />
        <p>password</p><input onChange={(e) => this.setPassword(e)} value={this.props.password} />
        <button
          onClick={() => this.props.signIn()}
        >Login</button>
        {this.props.error && <p>something went wrong</p>}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  login: state.loginReducer.login,
  password: state.loginReducer.password,
  authorized: state.loginReducer.authorized,
  error: state.loginReducer.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
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
  mapDispatchToProps
)(Login);
