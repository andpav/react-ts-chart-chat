import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

type SignOutComponentProps = {
  authorized: boolean;
  changePage: () => void;
};

export default function signOutRequired(InnerComponent: JSX.Element): JSX.Element {
  class SignOutComponent extends Component<SignOutComponentProps, {}> {
    componentDidMount(): void {
      this.checkAuth(this.props.authorized);
    }

    componentDidUpdate(): void {
      this.checkAuth(this.props.authorized);
    }

    checkAuth = (authorized: boolean): void => {
      if (authorized) {
        this.props.changePage();
      }
    };

    render(): JSX.Element | null {
      // @ts-ignore
      return this.props.authorized ? null : <InnerComponent {...this.props} />;
    }
  }

  // @ts-ignore
  const mapStateToProps = state => ({
    authorized: state.loginReducer.authorized,
  });

  // @ts-ignore
  const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/chart'),
  }, dispatch);

  // @ts-ignore
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignOutComponent);
}
