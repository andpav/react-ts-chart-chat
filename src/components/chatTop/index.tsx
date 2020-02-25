import React from 'react';

import { chatMessage } from '../../typing/types';

import './chatTop.css';

type ChatTopProps = {
  login: string;
  messages: Array<chatMessage>;
}

class ChatTop extends React.Component<ChatTopProps, {}> {
  componentDidUpdate(): void {
    this.scrollToBottom();
  }

  scrollToBottom = (): void => {
    // @ts-ignore
    this.chatTop.scrollTop = this.chatTop.scrollHeight;
  };

  render(): JSX.Element {
    return (
      <div
        className="chat-top"
        // eslint-disable-next-line arrow-parens
        // @ts-ignore
        ref={el => { this.chatTop = el; }}
      >
        {this.props.messages.map((message) => {
          const myMessage = this.props.login === message.name;

          return (
            <div key={message.text} className="chat-top__message">
              <div className={`chat-top__name chat-top__name_${myMessage ? 'right' : 'left'}`}>{message.name}</div>
              <div className={`chat-top__text chat-top__text_${myMessage ? 'right' : 'left'}`}>{message.text}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChatTop;
