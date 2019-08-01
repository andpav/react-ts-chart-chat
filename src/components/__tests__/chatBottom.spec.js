import 'raf/polyfill';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatBottom from '../chatBottom';

configure({ adapter: new Adapter() });

const ChatBottomProps = {
  text: 'text',
  error: true,
};

const enzymeWrapper = mount(<ChatBottom {...ChatBottomProps} />);

describe('ChatBottom unit tests', () => {
  it('ChatBottom render', () => {
    const buttons = enzymeWrapper.find('.button__button');
    const errorMessages = enzymeWrapper.find('.button__error');

    expect(buttons.length).toEqual(1);
    expect(errorMessages.length).toEqual(1);
  });
});
