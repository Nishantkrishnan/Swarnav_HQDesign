import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button,
} from 'react-bootstrap';
import styles from './Login.css';
import { logIn } from './Login.actions';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
  }

  getValidationState = () => { }

  login = () => {
    this.props.dispatch(logIn(this.mobile_no.value, this.password.value));
  }

  render() {
    return (
      <div>
        <Form
          className={styles.formSignin}
          onSubmit={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.login();
            }
          }
        >
          <img className="mb-4" src="../../src/images/hq_final_white-01.svg" alt="" width="150" height="150" />
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>

          <FormGroup
            validationState={this.getValidationState()}
          >
            <ControlLabel className="sr-only">Phone</ControlLabel>
            <FormControl
              type="text"
              className={styles.formControl}
              placeholder="Phone / Email"
              inputRef={(ref) => { this.mobile_no = ref; }}
              required=""
              autoFocus="true"
            />

            <ControlLabel className="sr-only">Password</ControlLabel>
            <FormControl
              type="password"
              className={styles.formControl}
              placeholder="Password"
              inputRef={(ref) => { this.password = ref; }}
              required=""
              autoFocus=""
            />

            <Checkbox readOnly>Remember me</Checkbox>
            <Button type="submit" className="btn btn-primary">Sign in</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default connect()(Login);
