import React from 'react';

import './input.css';

type InputProps = {
  value: string;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onKeyDown?: (key: KeyboardEvent) => void;
  onChange: (text: React.FormEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps): JSX.Element => (
  <input
    // TODO: classnames
    className={`input ${props.className ? props.className : ''}`}
    placeholder={props.placeholder}
    onChange={(e: React.FormEvent<HTMLInputElement>) => props.onChange(e)}
    value={props.value}
    autoFocus={props.autoFocus}
    // @ts-ignore
    onKeyDown={props.onKeyDown ? (e: KeyboardEvent) => props.onKeyDown(e) : null}
  />
);

export default Input;
