// @flow

import React from 'react';

import Button from '../button';
import Input from '../input';

type ChatBottomProps = {
  text: string,
  error: boolean,
  sendMessage: () => void,
  setText: (string) => void,
  onKeyDown: (KeyboardEvent) => void,
}

const ChatBottom = (props: ChatBottomProps): React$Element<*> => (
  <div className="chat-top">
    <p>Your message:</p>
    <Input
      onChange={props.setText}
      onKeyDown={props.onKeyDown}
      value={props.text}
      autoFocus
    />
    <Button
      text="send"
      onClick={props.sendMessage}
      error={props.error}
    />
  </div>
);

export default ChatBottom;
