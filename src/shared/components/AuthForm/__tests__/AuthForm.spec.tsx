import * as React from 'react';
import AuthForm from '../index';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { shallow } from 'enzyme';

describe('<AuthForm />', () => {
  test('The button is disabled if username or password are blank', () => {
    const wrapper = shallow(<AuthForm title="test" onSubmit={(u, p) => Promise.resolve(true)} />);

    expect(wrapper.find(Button).props().disabled).toBeTruthy();

    wrapper.setState({ username: 'test' });

    expect(wrapper.find(Button).props().disabled).toBeTruthy();
  });

  test('The button is not disabled if username and password are filled', () => {
    const wrapper = shallow(<AuthForm title="test" onSubmit={(u, p) => Promise.resolve(true)} />);
    wrapper.setState({ username: 'test', password: 'test' });

    expect(wrapper.find(Button).props().disabled).toBeFalsy();
  });
});
