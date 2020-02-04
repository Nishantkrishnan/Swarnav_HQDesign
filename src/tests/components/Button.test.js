// /**
//  * Created by sireesha on 15/11/17.
//  */
// import { mount } from 'enzyme';
// import React from 'react';
// import renderer from 'react-test-renderer';
// import Button from '../../components/Button/Button';
//
// describe('Button Component', () => {
//     let ButtonTree;
//     const text = 'test this button';
//     let ButtonWraper;
//     let disabledButton;
//     let changed = false;
//
//     const eventFunction = (event) => {
//         if (event !== undefined) changed = true;
//     };
//
//     beforeEach(() => {
//         changed = false;
//     });
//
//     beforeAll(() => {
//         ButtonTree = renderer.create(<Button
//             text={text}
//         />);
//
//         ButtonWraper = mount(<Button
//             text={text}
//             onClick={eventFunction}
//         />);
//
//         disabledButton = mount(<Button
//             text={text}
//             disabled
//         />);
//     });
//
//     test('Snapshot match testing', () => {
//         expect(ButtonTree).toMatchSnapshot();
//     });
//
//     test('Trigger onClick prop', () => {
//         ButtonWraper.simulate('click');
//         expect(changed).toBeTruthy();
//     });
//
//     test('Check children prop test', () => {
//         expect(disabledButton.prop('text')).toMatch(text);
//     });
//
//     test('Check Disabled css', () => {
//         expect(disabledButton.hasClass('disabled')).toBeTruthy();
//     });
//
//     test('Check Disabled Prop', () => {
//         expect(disabledButton.prop('disabled')).toBeTruthy();
//     });
//
//
// });
