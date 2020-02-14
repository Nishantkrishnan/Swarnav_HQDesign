import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import contactUsSelector from './ContactUs.selectors';
import { fetchContactUs } from './ContactUs.actions';
import { Loader } from '../../../containers/Loader/Loader';
import styles from './ContactUs.css';

class ContactUs extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      services: {},
      contactUs: props.contactUs,
      serviceTypeIndex: 0,
      individualCategory: false,
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchContactUs());
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ contactUs: nextProps.contactUs });
  }

  destroySession = () => {
    localStorage.clear();
  }

  render() {
    if (this.state.contactUs === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    return (
      <div className="textAlignLeft">
        {/* <h1>{this.state.contactUs.page_name}</h1> */}

        {
          Object.values(this.state.contactUs.contacts).map((contact) => {
            return (
              <div key={contact.phone_no}>
                <h2> {contact.name} </h2>
                <p> Phone No: {contact.phone_no} </p>
                <p> Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                <p> Designation: {contact.designation} </p>
              </div>
            );
          })
        }
      </div>
    );
  }
}
export const mapStateToProps = state => contactUsSelector(state);
export default connect(mapStateToProps)(ContactUs);
