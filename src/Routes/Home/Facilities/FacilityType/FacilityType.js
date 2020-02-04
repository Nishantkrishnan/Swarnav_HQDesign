import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Loader } from '../../../../containers/Loader/Loader';
import facilitiesSelector from '../Facilities.selectors';
import { getFacilities } from '../Facilities.actions';
import { blockLocationAndOpen } from '../../Locations/Locations.actions';
// import { fetchLocations } from '../../Locations/Locations.actions';
import FacilityCategory from '../FacilityCategory/FacilityCategory';
import {Grid,withStyles} from '@material-ui/core';
import styles from '../Facilities.css';
export const history = createBrowserHistory();
const design = theme => ({
  displayMsg: {
    marginTop: "3%",
    marginLeft: "3.4%",
    fontFamily:'Roboto Medium',
    fontSize:'20px',

  },
})
class FacilityType extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    facilityTypes: PropTypes.array,
    currentLocation: PropTypes.array,
  };
  static defaultProps = {
    dispatch: f => f,
    facilityTypes: null,
    currentLocation: null,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      facilityTypes: null,
      facilityIndex: 0,
      individualCategory: false,
      currentLocation: null,
      selectLocationVal: null,
    };
    this.handleFacilityTypeClick = this.handleFacilityTypeClick.bind(this);
  }
  // componentWillMount() {
  //   if (this.props.facilityTypes !== null) {
  //     this.setState({ facilityTypes: this.props.facilityTypes.toJS() });
  //   }
  // }
  componentDidMount() {
    this.props.dispatch(blockLocationAndOpen(true));
    document.title = "GoodWorks HQ - Facility";
    // handling the browser back listener
    this.backListener = history.listen(location => {
      window.location.href = "/";
    });
    if (this.props.currentLocation) {
      this.props.dispatch(getFacilities(this.props.currentLocation.toJS().id))
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLocation && nextProps.currentLocation !== this.props.currentLocation) {
        this.props.dispatch(getFacilities(nextProps.currentLocation.toJS().id));
    }
    if (nextProps.facilityTypes && nextProps.facilityTypes !== this.props.facilityTypes) {
      this.setState({ facilityTypes: nextProps.facilityTypes.toJS() });
    }
  }
  handleBackBtnClick = () => {
    const individualCategory = !this.state.individualCategory;
    this.setState({ individualCategory });
    this.props.dispatch(blockLocationAndOpen(true));
  }
  handleFacilityTypeClick(facilityIndex) {
    const individualCategory = !this.state.individualCategory;
    this.setState({ individualCategory, facilityIndex });
    this.props.dispatch(blockLocationAndOpen(false));
  }
  // browser back listener handle
  componentWillUnmount() {
    this.backListener(this);
  }
  handleSelect = (event) => {
    this.props.dispatch(getFacilities(event.target.value));
  }
  render() {
    const { classes } = this.props
    const facilityTypes = this.state.facilityTypes ? this.state.facilityTypes : [];
    console.log("**************1111", facilityTypes)
    if (facilityTypes.length == 0) {
      return (
        <Grid className={classes.displayMsg}>
          No facility found for this loaction
        </Grid>
      );
    }
    //
    return (
      <div >
<FacilityCategory
            facilityCategory={this.state.facilityTypes[this.state.facilityIndex]}
            handleBackBtnClick={this.handleBackBtnClick}
          />
        {/* {!this.state.individualCategory &&
          <div className="row">
            <div className="centerPanel">
              {this.props.facilityTypes && this.props.facilityTypes.toJS().map((facilityType, index) => {
                return (
                  <div className={classNames(styles.assetCont)} key={facilityType.id}>
                    <div className={classNames(styles.itemCont)}>
                      <span
                        role="button"
                        tabIndex="0"
                        className={styles.noDecoration}
                        onClick={() => this.handleFacilityTypeClick(index)}
                      >
                        <img src={facilityType.images.length > 0 ? facilityType.images[0].original : null} alt={facilityType.title} className={classNames('img', 'img-responsive')} />
                        <span>{facilityType.title}</span>
                      </span>
                    </div>
                    <p>{facilityType.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        } */}
        {/* Services by Individual Category goes here */}
        {/* {this.state.individualCategory &&
          <FacilityCategory
            facilityCategory={this.state.facilityTypes[this.state.facilityIndex]}
            handleBackBtnClick={this.handleBackBtnClick}
          />} */}
        {/* End Services by Individual Category */}
        {/* <div>Select Location</div>
        <select onChange={this.handleSelect} value={this.state.selectLocationVal}>
          {
            locations.map(location => {
              return(<option value={location.id}>{location.address_line1}</option>);
            })
          }
        </select> */}
      </div>
    );
  }
}
export const mapStateToProps = state => facilitiesSelector(state);
export default connect(mapStateToProps)(withStyles(design)(FacilityType));
