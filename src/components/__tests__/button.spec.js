import 'raf/polyfill';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../button';

configure({ adapter: new Adapter() });

const ButtonProps = {
  text: 'text',
  disable: true,
  className: 'class__class',
  error: true,
};

const enzymeWrapper = mount(<Button {...ButtonProps} />);

describe('Button unit tests', () => {
  it('Button render', () => {
    const buttons = enzymeWrapper.find('.button__button');
    const errors = enzymeWrapper.find('.button__error');

    expect(buttons.length).toEqual(1);
    expect(errors.length).toEqual(1);
  });
});
