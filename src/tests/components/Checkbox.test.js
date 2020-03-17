// /**
//  * Created by sireesha on 15/11/17.
//  */
// import { mount } from 'enzyme';
// import React from 'react';
// import renderer from 'react-test-renderer';
// import Checkbox from '../../components/Checkbox/Checkbox';
//
// describe('Checkbox Component', () => {
//     let CheckboxTree;
//     let CheckboxWraper;
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
//         CheckboxTree = renderer.create(<Checkbox
//             checked={true}
//         />);
//
//         CheckboxWraper = mount(<Checkbox
//             checked={true}
//             onClick={eventFunction}
//         />);
//
//     });
//
//     test('Snapshot match testing', () => {
//         expect(CheckboxTree).toMatchSnapshot();
//     });
//
//     test('Trigger onClick prop', () => {
//         CheckboxWraper.simulate('click');
//         expect(changed).toBeTruthy();
//     });
//
// });
