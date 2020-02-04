import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
} from 'react-bootstrap';
import changePassword from './ChangePassword.actions';
import styles from './ChangePassword.css';

class ChangePassword extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  getValidationState = () => { }

  handleChangePasswordClick = () => {
    this.props.dispatch(changePassword(
      this.password.value,
      this.password_confirmation.value,
      this.current_password.value,
    ));
  }

  destroySession = () => {
    localStorage.clear();
  }

  componentDidMount()
  {
    document.title = "GoodWorks HQ - Change Password";
  }

  render() {
    return (
      <div>
        <h2>Change Password</h2>
        <Form
          className={styles.formSignin}
          onSubmit={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.handleChangePasswordClick();
            }
          }
        >
          <FormGroup
            // controlId="formBasicText"
            validationState={this.getValidationState()}
          >

            <ControlLabel className="sr-only">Password</ControlLabel>
            <FormControl
              type="password"
              className={styles.formControl}
              placeholder="Password"
              inputRef={(ref) => { this.password = ref; }}
              required="true"
              autoFocus=""
            />
            <FormControl.Feedback />
            <HelpBlock>Your new password.</HelpBlock>

            <ControlLabel className="sr-only">Password Confirmation</ControlLabel>
            <FormControl
              type="password"
              className={styles.formControl}
              placeholder="Password Confirmation"
              inputRef={(ref) => { this.password_confirmation = ref; }}
              required="true"
              autoFocus=""
            />
            <FormControl.Feedback />
            <HelpBlock>Retype new password.</HelpBlock>

            <ControlLabel className="sr-only">Current Password</ControlLabel>
            <FormControl
              type="password"
              className={styles.formControl}
              placeholder="Current Password"
              inputRef={(ref) => { this.current_password = ref; }}
              required="true"
              autoFocus=""
            />
            <FormControl.Feedback />
            <HelpBlock>Your current password.</HelpBlock>

            <Button type="submit" className="btn btn-lg btn-success btn-block">Update</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default connect()(ChangePassword);
