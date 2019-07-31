// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

type SignOutComponentProps = {
  authorized: boolean,
  changePage: () => void,
};

export default function signOutRequired(InnerComponent) {
  class signOutComponent extends Component<{}, SignOutComponentProps> {
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

    render(): React$Element<*> {
      return this.props.authorized ? null : <InnerComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authorized: state.loginReducer.authorized,
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/chart'),
  }, dispatch);

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(signOutComponent);
}
