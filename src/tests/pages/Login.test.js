/**
 * Created by sireesha on 15/11/17.
 */
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../Routes/Login/Login';

describe('Login Page tests', () => {
  let LoginPageTree;
  let wrapper;
  beforeEach(() => {

  });

  beforeAll(() => {
    LoginPageTree = renderer.create(<Login />);
    wrapper = mount(<Login />);
  });

  test('Snapshot match testing', () => {
    expect(LoginPageTree).toMatchSnapshot();
  });
  test('Component structure testing', () => {
    expect(wrapper.find('Input').node).toBeDefined();
  });
  test('structure testing: Check logo', () => {
    expect(wrapper.find('.logo').node).toBeDefined();
  });
  test('structure testing: Check forgot password link', () => {
    expect(wrapper.find('.link').node).toBeDefined();
  });
  test('structure testing: Check Login Button', () => {
    expect(wrapper.find('Button').node).toBeDefined();
  });
  test('structure testing: Check Checkbox Button', () => {
    expect(wrapper.find('Checkbox').node).toBeDefined();
  });
});
