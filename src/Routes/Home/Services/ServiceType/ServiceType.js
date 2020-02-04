import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../containers/Loader/Loader';
import { blockLocationAndOpen } from '../../Locations/Locations.actions';
import servicesSelector from '../Services.selectors';
import { fetchServices } from '../Services.actions';
import { fetchLocations } from '../../Locations/Locations.actions';
import ServiceCategory from '../ServiceCategory/ServiceCategory';
import styles from '../Services.css';
class ServiceType extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    serviceTypes: PropTypes.array,
    locations: PropTypes.array,
  };
  static defaultProps = {
    dispatch: f => f,
    serviceTypes: null,
    locations: null,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      serviceTypes: null,
      serviceTypeIndex: 0,
      individualCategory: false,
      locations: null,
      selectLocationVal: null,
    };
  }
  componentWillMount() {
    if (this.props.serviceTypes !== null) {
      // this.setState({ serviceTypes: this.props.serviceTypes });
    }
  }
  componentDidMount() {
    // this.props.dispatch(fetchServices());
    this.props.dispatch(fetchLocations());
    document.title = "GoodWorks HQ - Services";
    this.props.dispatch(blockLocationAndOpen(true));
    if (this.props.currentLocation) {
      this.props.dispatch(fetchServices(this.props.currentLocation.toJS().id));
    }
  }
  componentWillReceiveProps(props) {
    // this.setState({ serviceTypes: props.serviceTypes });
    if (props.currentLocation && props.currentLocation !== this.props.currentLocation) {
      this.props.dispatch(fetchServices(props.currentLocation.toJS().id));
    }
    if (props.serviceTypes !== this.props.serviceTypes) {
      this.setState({ serviceTypes: props.serviceTypes });
    }
  }
  handleBackBtnClick = () => {
    const individualCategory = !this.state.individualCategory;
    this.setState({ individualCategory });
    this.props.dispatch(blockLocationAndOpen(true));
  }
  handleServiceTypeClick = (serviceTypeIndex) => {
    const individualCategory = !this.state.individualCategory;
    this.setState({ individualCategory, serviceTypeIndex });
    this.props.dispatch(blockLocationAndOpen(false));
  }
  handleSelect = (event) => {
    this.props.dispatch(fetchServices(event.target.value));
  }
  render() {
    if (!this.state.serviceTypes) {
      return (
        <div>No service found for this location</div>
      );
    }
    const serviceTypes = this.state.serviceTypes ? this.state.serviceTypes.toJS() : [];
    const locations = this.state.locations ? this.state.locations.toJS() : [];
    console.log(serviceTypes,"servicessssss");
    return (
      <div >
          <ServiceCategory
            serviceCategory={serviceTypes}
            handleBackBtnClick={this.handleBackBtnClick}
          />
      </div>
    );
  }
}
export const mapStateToProps = state => servicesSelector(state);
export default connect(mapStateToProps)(ServiceType);
