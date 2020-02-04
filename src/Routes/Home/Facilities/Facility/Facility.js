import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../containers/Loader/Loader';
import Button from '../../../../components/Button/Button';
import BookFacility from '../../BookFacility/BookFacility';
import Wrapper from '../../../hoc/Wrapper';
import styles from '../Facilities.css';
class Facility extends Component {
  state = {
    proceedBooking: false,
  }
  handleBookingClick = () => {
    const proceedBooking = !this.state.proceedBooking;
    this.setState({ proceedBooking });
  }
  handleBookingBack = (e) => {
    this.setState({
      proceedBooking: false
    });
  }
  componentDidMount()
  {
    document.title = "GoodWorks HQ - Facility";
  }
  render() {
    const { facility, handleBackBtnClick } = this.props;
    return (
      <Wrapper>
        {/* {!this.state.proceedBooking &&
          <div className="row">
            <div className="col-md-12">
              <Button className={styles.backBtn} text="Back" onClick={() => { handleBackBtnClick(); }} />
              <h1>Book {facility.title}</h1>
              <div className={classNames(styles.facilityItem, 'row')}>
                <div className="col-sm-2 col-xs-3">Time Slot</div>
                <div className="col-sm-10 col-xs-9">
                  <span>8AM to 8PM</span>
                </div>
              </div>
              <div className={classNames(styles.facilityItem, 'row')}>
                <div className="col-sm-2 col-xs-3">Information</div>
                <div className="col-sm-10 col-xs-9">
                  <span>{facility.description}</span>
                </div>
              </div>
              <div className={classNames('row')}>
                <div className="col-sm-12">
                  <Button
                    className={"btn btn-lg btn-success btn-block " + styles.margin_bottom_20}
                    text="Proceed"
                    onClick={() => { this.handleBookingClick(); }}
                  />
                </div>
              </div>
            </div>
          </div>
        } */}
        {/* {this.state.proceedBooking && */}
          <BookFacility facility={facility} facilityId={facility.id} facilityName={facility.title} handleBookingBack={this.handleBookingBack} />
        {/* } */}
      </Wrapper>
    );
  }
}
Facility.propTypes = {
  facility: PropTypes.object,
  handleBackBtnClick: PropTypes.func,
};
export default Facility;
