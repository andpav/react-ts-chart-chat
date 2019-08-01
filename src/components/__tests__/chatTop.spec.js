import 'raf/polyfill';
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatTop from '../chatTop';

configure({ adapter: new Adapter() });

const ChatTopProps = {
  login: 'login',
  messages: [{ name: 'name', message: 'message' }],
};

const enzymeWrapper = mount(<ChatTop {...ChatTopProps} />);

describe('ChatTop unit tests', () => {
  it('ChatTop render', () => {
    const messages = enzymeWrapper.find('.chat-top__message');

    expect(messages.length).toEqual(1);
  });
});
