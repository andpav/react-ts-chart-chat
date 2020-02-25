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
  authorized: boolean;
  login: string;
  messages: Array<chatMessage>;
  text: string;
  error: boolean;
  sendMessage: () => void;
  setText: (text: string) => void;
  setChatConnection: () => void;
  setError: (isError: boolean) => void;
}

class Chat extends Component<ChatProps, {}> {
  componentDidMount(): void {
    this.props.setChatConnection();
  }

  setText = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.setText(event.currentTarget.value);
    this.props.setError(false);
  };

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === keys.Enter) {
      this.props.sendMessage();
    }
  };

  render(): JSX.Element {
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
          // @ts-ignore
          setText={this.setText}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

// @ts-ignore
const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
  login: state.loginReducer.login,
  messages: state.chatReducer.messages,
  text: state.chatReducer.text,
  error: state.chatReducer.error,
});

// @ts-ignore
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
