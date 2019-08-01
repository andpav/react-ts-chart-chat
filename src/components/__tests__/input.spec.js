import 'raf/polyfill';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../input';

configure({ adapter: new Adapter() });

const InputProps = {
  value: 'text',
  placeholder: 'text',
  className: 'class__class',
  autoFocus: true,
};

const enzymeWrapper = mount(<Input {...InputProps} />);

describe('Input unit tests', () => {
  it('Input render', () => {
    const inputs = enzymeWrapper.find('.input');

    expect(inputs.length).toEqual(1);
  });
});
