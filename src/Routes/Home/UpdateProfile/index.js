import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Loader } from '../../../containers/Loader/Loader';
import updateProfileSelector from './UpdateProfile.selectors';
import { updateProfile } from './UpdateProfile.actions';

class EditProfile extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    userProfile: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);
    this.updateProfile = this.updateProfile.bind(this);
  }

  decodeHtml = (html) => {
    const divElement = document.createElement('div');
    divElement.innerHTML = html;
    // handle case of empty input
    return divElement.childNodes.length === 0 ? '' : divElement.childNodes[0].nodeValue;
  }

  updateProfile = () => {
    const inputFields = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      designation: this.designation.value,
      hobbies: this.hobbies.value,
      about_me: this.about_me.value,
    };
    this.props.dispatch(updateProfile(inputFields));
  }


  render() {
    const userProfile = this.props.userProfile;
    if (userProfile === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }

    return (
      <div>
        <h2>Update Profile</h2>
        <Form
          horizontal
          onSubmit={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.updateProfile();
            }
          }
        >
          <FormGroup controlId="formHorizontalFirstName">
            <Col componentClass={ControlLabel} sm={2}>
              Firest Name
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                defaultValue={userProfile.first_name}
                placeholder="First Name"
                inputRef={(ref) => { this.first_name = ref; }}
                required="true"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLastName">
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                defaultValue={userProfile.last_name}
                placeholder="Last name"
                inputRef={(ref) => { this.last_name = ref; }}
                required="true"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLastName">
            <Col componentClass={ControlLabel} sm={2}>
              Designation
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                defaultValue={userProfile.designation}
                placeholder="Designation"
                inputRef={(ref) => { this.designation = ref; }}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLastName">
            <Col componentClass={ControlLabel} sm={2}>
              Hobbies
            </Col>
            <Col sm={10}>
              <FormControl
                type="textarea"
                defaultValue={userProfile.hobbies}
                placeholder="Hobbies"
                inputRef={(ref) => { this.hobbies = ref; }}
                componentClass="textarea"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLastName">
            <Col componentClass={ControlLabel} sm={2}>
              About Me
            </Col>
            <Col sm={10}>
              <FormControl
                type="textarea"
                defaultValue={this.decodeHtml(userProfile.about_me)}
                placeholder="About Me"
                inputRef={(ref) => { this.about_me = ref; }}
                componentClass="textarea"
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Update</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export const mapStateToProps = state => updateProfileSelector(state);
export default connect(mapStateToProps)(EditProfile);
