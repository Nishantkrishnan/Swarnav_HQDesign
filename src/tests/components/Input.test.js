/**
 * Created by Sireesha on 15/11/17.
 */
// import 'jsdom-global/register';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../components/Input/Input';

describe('Input component tests', () => {
  let InputTree;
  let wrapper;
  let disabledInput;
  const inputType = 'text';
  let changed = false;
  let enterkeyPressed = false;
  let escapeKeyPressed = false;
  let keyPressed = false;

  const eventFunction = (event) => {
    if (event !== undefined) changed = true;
  };

  const keyFunction = (event) => {
    if (event !== undefined && event.keyCode === 13) {
      enterkeyPressed = true;
    } else if (event !== undefined && event.keyCode === 27) {
      escapeKeyPressed = true;
    }
    keyPressed = true;
  };

  beforeEach(() => {
    changed = false;
    enterkeyPressed = false;
    escapeKeyPressed = false;
    keyPressed = false;
  });

  beforeAll(() => {
    InputTree = renderer.create(<Input
      type={inputType}
      placeHolder="Enter your name"
    />);

    wrapper = mount(<Input
      type={inputType}
      placeHolder="Enter your name"
      onKeyDown={keyFunction}
      onEnterKey={keyFunction}
      onEscapeKey={keyFunction}
      onClick={eventFunction}
      onChange={eventFunction}
      onFocus={eventFunction}
      onBlur={eventFunction}
    />);

    disabledInput = mount(<Input
      type={inputType}
      placeHolder="Enter your name"
      disabled
    />);
  });


  test('Snapshot match testing', () => {
    expect(InputTree).toMatchSnapshot();
  });

  test('Component structure testing', () => {
    expect(wrapper.find('input').node).toBeDefined();
  });

  test('Trigger onChange prop', () => {
    wrapper.find('input').simulate('change', { target: { validity: { valid: true } } });
    expect(changed).toBeTruthy();
  });

  test('Trigger onFocus prop', () => {
    wrapper.find('input').simulate('focus', { target: {} });
    expect(changed).toBeTruthy();
  });

  test('Trigger onBlur prop', () => {
    wrapper.find('input').simulate('blur');
    expect(changed).toBeTruthy();
  });

  test('Trigger onClick prop', () => {
    wrapper.find('input').simulate('click');
    expect(changed).toBeTruthy();
  });

  test('Trigger onEnterKey', () => {
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    expect(enterkeyPressed).toBeTruthy();
  });

  test('Trigger onEscapeKey', () => {
    wrapper.find('input').simulate('keyDown', { keyCode: 27 });
    expect(escapeKeyPressed).toBeTruthy();
  });

  test('Trigger keyDown', () => {
    wrapper.find('input').simulate('keyDown', { keyCode: 15 });
    expect(keyPressed).toBeTruthy();
  });

  test('keyDown functional test for escape key', () => {
    wrapper.instance().keyDown({ keyCode: 27 });
    expect(escapeKeyPressed).toBeTruthy();
  });

  test('keyDown functional test for enter key', () => {
    wrapper.instance().keyDown({ keyCode: 13 });
    expect(enterkeyPressed).toBeTruthy();
  });

  test('disabledInput prop test', () => {
    expect(disabledInput.prop('disabled')).toBeTruthy();
  });

  test('disabledInput css class test', () => {
    expect(disabledInput.hasClass('disabled')).toBeTruthy();
  });

  test('should get value', () => {
    const value = wrapper.node.getValue();
    expect(wrapper.find('input').node.value).toMatch(value);
  });

  test('Key functional test', () => {
    expect(!wrapper.instance().getIsChecked()).toBeTruthy();
  });

  test('Default prop test onEscapeKey', () => {
    expect(Input.defaultProps.onEscapeKey('onEscapeKey')).toMatch('onEscapeKey');
  });

  test('Default prop test onKeyDown', () => {
    expect(Input.defaultProps.onKeyDown('onKeyDown')).toMatch('onKeyDown');
  });

  test('Default prop test onClick', () => {
    expect(Input.defaultProps.onClick('onClick')).toMatch('onClick');
  });

  test('Default prop test onEnterKey', () => {
    expect(Input.defaultProps.onEnter('onEnter')).toMatch('onEnter');
  });

  test('Default prop test onChange', () => {
    expect(Input.defaultProps.onChange('onChange')).toMatch('onChange');
  });

  test('Default prop test onFocus', () => {
    expect(Input.defaultProps.onFocus('onFocus')).toMatch('onFocus');
  });

  test('Default prop test onBlur', () => {
    expect(Input.defaultProps.onBlur('onBlur')).toMatch('onBlur');
  });

  test('Checked value test', () => {
    const checkBox = mount(<Input
      type="checkbox"
      checked
      placeHolder="Enter your name"
    />);

    expect(checkBox.instance().getIsChecked()).toBeTruthy();
  });

  test('defaultValue test', () => {
    const value = 'present';
    const wrap = mount(<Input
      type={inputType}
      placeHolder="Enter your name"
      defaultValue={value}
    />);
    expect(wrap.find('input').node.value).toMatch(value);
  });

  test('Value test', () => {
    expect(1 + 1).toBe(2);
    const value = 'present';
    const wrap1 = mount(<Input
      type={inputType}
      placeHolder="Enter your name"
      style={{ marginTop: '190px', marginLeft: '60px' }}
      value={value}
    />);
    expect(wrap1.find('input').node.value).toMatch(value);
  });
});
