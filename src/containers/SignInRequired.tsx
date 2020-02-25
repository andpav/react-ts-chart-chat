import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

type SignInComponentProps = {
  authorized: boolean;
  changePage: () => void;
};

export default function signInRequired(InnerComponent: JSX.Element) {
  class SignInComponent extends Component<SignInComponentProps, {}> {
    componentDidMount(): void {
      this.checkAuth(this.props.authorized);
    }

    componentDidUpdate(): void {
      this.checkAuth(this.props.authorized);
    }

    checkAuth = (authorized: boolean): void => {
      if (!authorized) {
        this.props.changePage();
      }
    };

    render(): JSX.Element | null {
      // @ts-ignore
      return this.props.authorized ? <InnerComponent {...this.props} /> : null;
    }
  }

  // @ts-ignore
  const mapStateToProps = state => ({
    authorized: state.loginReducer.authorized,
  });

  // @ts-ignore
  const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/login'),
  }, dispatch);

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignInComponent);
}
