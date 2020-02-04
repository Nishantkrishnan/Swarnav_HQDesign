import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from '../../../containers/Loader/Loader';
import bookFacilitySelector from './BookFacility.selectors';
import { createBookFacility, showLoader } from './BookFacility.actions';
import Button from '../../../components/Button/Button';
import Wrapper from '../../hoc/Wrapper';
import styles from './BookFacility.css';

class ConfirmBooking extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleChangeClick: PropTypes.func,
    selectedSlots: PropTypes.array,
    facilityName: PropTypes.string,
    facilityId: PropTypes.number,
    showLoader: PropTypes.bool,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedSlots: [],
      note: '',
    };
  }

  componentWillMount() {
    this.setState({ selectedSlots: this.props.selectedSlots });
  }

  handleConfBooking = () => {
    const reqBody = {
      facility_id: this.props.facilityId,
      note: this.state.note,
      slots: this.state.selectedSlots,
    };
    this.props.dispatch(createBookFacility(reqBody));
    this.props.dispatch(showLoader(true));
  }

  render() {
    const { handleChangeClick, selectedSlots, facilityName } = this.props;
    const date = moment.unix(selectedSlots[0].from_time).format('DD MMMM');
    return (
      <Wrapper className="row">
        <div className="col-md-12 col-xs-12">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h1>Confirm Booking {facilityName}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-xs-4">
              <strong>{date} Selected Slots:</strong><br />
              {selectedSlots.map((item) => {
                return (
                  <div key={item.from_time}>{moment.unix(item.from_time).format('LT')} to {moment.unix(item.to_time).format('LT')}</div>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-xs-3">
              <Button text="Change" className="btn btn-info btn-sm" onClick={() => { handleChangeClick(); }} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className={classNames(styles.confBtn, 'col-md-12 col-xs-12')}>
            Additional Notes
            <textarea className="form-control" onChange={(e) => { this.setState({ note: e.target.value }); }} />
          </div>
        </div>

        <div className="row">
          <div className={classNames(styles.confBtn, 'col-md-12 col-xs-12')}>
            <Button
              className="btn btn-lg btn-success btn-block"
              text="Confirm Booking"
              onClick={() => this.handleConfBooking()}
            />

          </div>
        </div>

        {this.props.showLoader && <Loader />}
      </Wrapper >
    );
  }
}

export const mapStateToProps = state => bookFacilitySelector(state);
export default connect(mapStateToProps)(ConfirmBooking);
