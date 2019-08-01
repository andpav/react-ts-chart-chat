// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ChatTop from '../../components/chatTop';
import ChatBottom from '../../components/chatBottom';
import keys from '../../constants/keys';
import { chatMessage } from '../../typing/types';

import {
  setText,
  sendMessage,
  setChatConnection,
  setError,
} from '../../actions/chat';

import './chat.css';

type ChatProps = {
  authorized: boolean,
  login: string,
  messages: Array<chatMessage>,
  text: string,
  error: boolean,
  sendMessage: () => void,
  setText: (string) => void,
  setChatConnection: () => void,
  setError: (boolean) => void,
}

class Chat extends Component<{}, ChatProps> {
  componentDidMount(): void {
    this.props.setChatConnection();
  }

  setText = (event: SyntheticInputEvent) => {
    this.props.setText(event.target.value);
    this.props.setError(false);
  };

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === keys.Enter) {
      this.props.sendMessage();
    }
  };

  render(): React$Element<*> {
    return (
      <div className="chat-page">
        <h1>Chat</h1>

        <ChatTop
          messages={this.props.messages}
          login={this.props.login}
        />

        <ChatBottom
          text={this.props.text}
          error={this.props.error}
          sendMessage={this.props.sendMessage}
          setText={this.setText}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
  login: state.loginReducer.login,
  messages: state.chatReducer.messages,
  text: state.chatReducer.text,
  error: state.chatReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage,
  setText,
  setChatConnection,
  setError,
  changePage: () => push('/login'),
},
dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
