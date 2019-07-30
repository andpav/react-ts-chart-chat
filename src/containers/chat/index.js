import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import {
  setAuthorized,
} from '../../actions/login';

import {
  setText,
  sendMessage,
  setChatConnection,
  setError,
} from '../../actions/chat';

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
  }

  setText = (event) => {
    this.props.setText(event.target.value);
    this.props.setError(false);
  };

  render() {
    return (
      <div>
        <h1>Chat</h1>

        {this.props.messages.map(message => (<div>
          <p>Name: {message.name}</p>
          <p>Text: {message.text}</p>
        </div>))}

        <p>Your message:</p><input onChange={(e) => this.setText(e)} value={this.props.text} />
        {this.props.error && <p>Something went wrong</p>}

        <button
          onClick={() => this.props.sendMessage()}
        >Send</button>

        <button
          onClick={() => this.props.setAuthorized(false)}
        >Logout</button>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  authorized: state.loginReducer.authorized,
  messages: state.chatReducer.messages,
  text: state.chatReducer.text,
  error: state.chatReducer.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      setAuthorized,
      sendMessage,
      setText,
      setChatConnection,
      setError,
      changePage: () => push('/login'),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
