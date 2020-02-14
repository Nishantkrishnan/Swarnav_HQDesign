/**
 * Created by Swetha on 23/11/17.
 */

import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Login from '../../Routes/Login/Login';

describe('Login component tests', () => {
    let Credentails;
    let keyPressed = false;
    let enterkeyPressed = false;


    const keyFunction = (event) => {
        if (event !== undefined && event.keyCode === 13)
            enterkeyPressed = true;
        keyPressed = true;
    };


    beforeEach(() => {
        enterkeyPressed = false;
        keyPressed = false;
    });


    beforeAll(() => {
        Credentails = renderer.create(<Login
            email={abc@xyz.com}
            password={12345}
        />)});



});