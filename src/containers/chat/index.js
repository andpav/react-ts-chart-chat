// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import {
  setText,
  sendMessage,
  setChatConnection,
  setError,
} from '../../actions/chat';

import './chat.css';

class Chat extends Component {
  componentDidMount() {
    // move to saga

    if (!this.props.authorized) {
      this.props.changePage();

      return;
    }

    this.props.setChatConnection();
  }

  componentDidUpdate() {
    // move to saga

    if (!this.props.authorized) {
      this.props.changePage();
    }

    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.chat.scrollTop = this.chat.scrollHeight;
  };

  setText = (event) => {
    this.props.setText(event.target.value);
    this.props.setError(false);
  };

  render() {
    const { login } = this.props;

    return (
      <div className="chat-page">
        <h1>Chat</h1>

        <div
          className="chat"
          // eslint-disable-next-line arrow-parens
          ref={el => { this.chat = el; }}
        >
          {this.props.messages.map(message => (
            <div className="chat__message">
              <span className={`chat__name ${login === message.name ? 'chat__name_right' : 'chat__name_left'}`}>{message.name}</span>
              <span className={`chat__text ${login === message.name ? 'chat__text_right' : 'chat__text_left'}`}>{message.text}</span>
            </div>
          ))}
        </div>

        <p>Your message:</p>
        <input
          className="chat-page__input"
          onChange={e => this.setText(e)}
          value={this.props.text}
        />

        <div className="chat-page__button-wrapper">
          <button
            type="button"
            className="chat-page__button"
            onClick={() => this.props.sendMessage()}
          >
            Send
          </button>
          {this.props.error && <p className="login-page__error">Something went wrong</p>}
        </div>
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
