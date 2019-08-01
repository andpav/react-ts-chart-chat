// @flow

import React from 'react';

import './button.css';

type ButtonProps = {
  text: string,
  error?: boolean,
  className?: string,
  disabled?: boolean,
  onClick: () => void,
}

const Button = (props: ButtonProps): React$Element<*> => (
  <div className="button__wrapper">
    <button
      type="button"
      className={`button__button ${props.disabled ? 'button__button_disabled' : ''}
      ${props.className ? props.className : ''}`}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.text}
    </button>
    {props.error && <p className="button__error">Something went wrong</p>}
  </div>
);

export default Button;
