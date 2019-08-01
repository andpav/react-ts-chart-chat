// @flow

import React from 'react';

import './input.css';

type InputProps = {
  value: string,
  placeholder?: string,
  className?: string,
  autoFocus?: boolean,
  onKeyDown?: (KeyboardEvent) => void,
  onChange: (SyntheticInputEvent) => void,
}

const Input = (props: InputProps): React$Element<*> => (
  <input
    className={`input ${props.className ? props.className : ''}`}
    placeholder={props.placeholder}
    onChange={(e: SyntheticInputEvent) => props.onChange(e)}
    value={props.value}
    autoFocus={props.autoFocus}
    onKeyDown={props.onKeyDown ? (e: KeyboardEvent) => props.onKeyDown(e) : () => {}}
  />
);

export default Input;
