import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router,Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Badge } from 'react-bootstrap';
import ScrollUpButton from "react-scroll-up-button";
// import AdminPanel from './AdminPanel/AdminPanel';
import Dashboard from './Dashboard/Dashboard';
import ServiceType from './Services/ServiceType/ServiceType';
import FacilityType from './Facilities/FacilityType/FacilityType';
import Profile from './Profile/Profile';
import BookFacility from './BookFacility/BookFacility';
import ChangePassword from './ChangePassword/ChangePassword';
import styles from './index.css';
import MyActivity from './MyActivity/MyActivity';
import Feedback from './Feedback';
import UserProfile from './UserProfile/UserProfile';
import Following from './Following/Following';
import Followers from './Followers/Followers';
import EditProfile from './UpdateProfile';
import RightPanel from '../../components/RightPanel';
import { fetchLocations, changeLocations } from '../Home/Locations/Locations.actions';
import locationSelector from '../Home/Locations/Location.selectors';
import $ from 'jquery';
import{ Grid,Button, withStyles,Card,Typography,Hidden,MenuItem,FormControl} from "@material-ui/core";
import Select from "react-select";
// import PropTypes from "prop-types";
import MenuDrawer from "./MenuDrawer"
import history from "../../utils/history";

var design = theme => ({
  formControl: {
    // width: "100%",
    marginTop:'3%',
    fontSize:'16px',
    fontFamily:'Roboto'
  },
  displayBlock: {
    display: "block",
    // fontSize:"16px ! important"
  },
  topHeader: {
    marginLeft: "6.9%",
    marginRight: "3.4%",
    ["@media (max-width:48em)"]: {
      marginLeft: "1%",
      marginRight: "1%",
    },
  },
  headerLogo: {
    height: "41px",
    ["@media (max-width:360px)"]: {
      height: "35px"
    }
  },
  headerLocation: {
    fontSize: " 16px",
    color: "#7C7C7C"
  },
  headerLocationMenu: {
  },
  iconRight: {
    width: "0.7%",
    height: "1.2%",
    float: "right",
    ["@media (max-width:360px)"]: {
      width: "0.7%",
      height: "0.7%"
    },
    listColor: {
      color: "red"
    }
  },
  listGrid: {
    textAlign: "start",
    marginTop: "1.5%",
    marginBottom: "1.5%",
    marginLeft: "6.9%",
    marginRight: "6.9%"
  },
  list: {
    display: "inline-flex",
    height: "1.1%",
    fontSize: "16px",
    ["@media (max-width:45em)"]: {
      marginLeft: "0%",
      marginRight: "0%",
      fontSize: "12px"
    },
    ["@media (max-width:22.5em)"]: {
      marginLeft: "0%",
      marginRight: "0%",
      fontSize: "12px"
    },
    ["@media (max-width:320px)"]: {
      fontSize: "10px"
    }
  },
  viewPage: {
    backgroundColor: "#eeeeee",
    // height:'100vh'
  },
  viewProfile: {
    marginLeft: "6.9%",
    marginTop: "0.8%",
    width: "18.1%",
  },
  viewPostForm: {
    marginLeft: "%",
    marginTop: "0.8%",
    width: "66%",
  //height:'100vh',
    ['@media (min-width:200px) and (max-width:1280px)']: {
      width: "100%",
      marginLeft: "1%",
      marginRight: "1%"
    }
  },
  viewDashboard: {
    // marginTop: "0.8%",
    // marginLeft:'1%',
    // width:'66%',
  },
  topicons: {
    marginTop: "0.9%",
    marginBottom: "0.9%",
    display: "inline-flex",
    ["@media (max-width:320px)"]: {
      margineft: "-10px"
    }
  },
  viewRightPanel: {
    marginTop: "1%",
    marginLeft: "1%",
    width: "24.3%",
    marginRight: "6.9%",
  },
  highlightLink: {
    textTransform: "none",
    textDecoration: "none",
    color: "red",
    fontSize: "16px"
  },
  normalLink: {
    textTransform: "none",
    textDecoration: "none",
    color: "black"
  },
  gridmobileLogo:{paddingLeft:'3%',
   ["@media (max-width:1279px)"]: {
      paddingLeft:'0%'
    }
}
});

const customStyles = {
  container: (base, state) => {
    console.log('this is screen width', screen.width);
    return ({
      ...base,
      zIndex: state.isFocused ? "999" : "1",  //Only when current state focused
      position:"absolute",
      border:"transparent",
      borderColor: "#e0e0e0",
      width:screen.width>768?"10%":"38%",
    })
},
control: base => ({
  ...base,
  overflow:'hidden',
  background: "#e0e0e0",
  border:"transparent",
  borderColor: "#e0e0e0",
}),
valueContainer: base => ({
 ...base,
 overflow:"unset !important",
 whiteSpace: "normal",
 animationName: styles.text,
 animationDuration: '5s',
 animationIterationCount: 'infinite',
 animationDirection: 'alternate',

}),
dropdownIndicator: provided => ({
  ...provided,
display: "none",
}),
singleValue: (provided, state) => {
  const overflow = "unset";
  return { ...provided, overflow};
},
indicatorSeparator: base =>({
  ...base,
  display: "none"
})
};


class Home extends Component {
  state = {
    textColor: "red",
    textDecoration: "none",
    locationVal:""
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  underlineOnLink = e => {
    this.setState({
      textDecoration: "underline",
      background: "blue"
    });
  };
  static propTypes = {
    dispatch: PropTypes.func,
    locations: PropTypes.array,
  };
  static defaultProps = {
    dispatch: f => f,
    facilityTypes: null,
    locations: null,
  };

  componentWillMount(){
    this.props.dispatch(fetchLocations());
  }
  componentDidMount(){
    this.setState({
      currentLocation: this.props.currentLocation
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.currentLocation && this.props.currentLocation !== nextProps.currentLocation){
      this.setState({
        currentLocation: nextProps.currentLocation
      })
    }
    if(nextProps.locations && this.props.locations !== nextProps.locations){
      this.setState({
        locations: nextProps.locations
      }
      // , () => {
      //   this.props.dispatch(changeLocations(this.state.locations[0]));
      // }
      )
    }
  }
  handleSelect = (event) => {
  
    this.setState({locationVal:event})
    const changedLocation = this.state.locations.filter(loc => loc.id == event.target.value)
    this.props.dispatch(changeLocations(changedLocation[0]));
  }


  render() {
    const {classes}= this.props
    const { textColor, flagValue, flag, locationVal } = this.state;
    const { changeColor, underlineOnLink } = this;
  //  console.log("history:",history);
    // const ValueContainer = ({ children, ...props }) => {
    //   return (
    //     components.ValueContainer && (
    //       <components.ValueContainer {...props}>
    //         {!!children && (
    //          <i class="material-icons"
    //          style={{
    //            paddingRight: "120px"
    //          }}
    //        >
    //          room
    //        </i>
    //         )}
    //         {children}
    //       </components.ValueContainer>
    //     )
    //   );
    // };

    // const DropdownIndicator = props => {
    //   return (
    //     components.DropdownIndicator && (
    //       <components.DropdownIndicator {...props}>
    //          <i class="material-icons"
    //             style={{
    //               paddingLeft: "18%",
    //               paddingTop: "25%",
    //               // paddingRight: "120px"
    //             }}
    //           >
    //             room
    //           </i>
    //       </components.DropdownIndicator>
    //     )
    //   );
    // };

    return (
      <Grid className={classes.displayBlock} >
      <Grid className={classes.topHeader} >
        <Grid
          container
          style={{
            display: "inline-flex",
            background:''
          }}
        >
          <Hidden lgUp>
            <Grid item  lg={1} md={1} sm={1} xs={1} style={{background:'',paddingRight:'1%',}}>
              <MenuDrawer />
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <Grid item lg={9} md={8} sm={7} xs={4} className={classes.gridmobileLogo} style={{}}>
              <Button  style={{marginLeft:'15%'}}>
                <img src="../../src/images/hq_mobile.png" className={classes.headerLogo} />
              </Button>
            </Grid>
          </Hidden>
          <Hidden mdDown>
            <Grid item lg={10} md={9} sm={9} xs={6} style={{background:""}}>
              <Button>
                <img src="../../src/images/hq_logo.png" className={classes.headerLogo} />
              </Button>
            </Grid>
          </Hidden>
          <Grid item
            lg={2}
              md={4}
              sm={4}
              xs={7}
              style={{ textAlign: "end", display: "inline-flex" }}
          >
            {
              this.props.displayLocation === true && this.props.currentLocation &&
              <Card
                style={{
                  width: "150%",
                  // height: "75%",
                  textAlign: "start",
                  marginTop: "2.5%",
                  marginBottom:"2.5%",
                  background: "#e0e0e0",
                  display: "inline-flex",
                    boxShadow:'none',
                }}
              >
                {/* <div >
                  <Select
                    placeholder="Select location"
                    value={locationVal}
                    autosize={true}
                    options={
                      this.state.locations && this.state.locations.map(location =>{
                        return ({
                          value:location.address_line1, label:location.address_line1
                        })
                      })
                    }
                    onChange={this.handleSelect}
                    styles={customStyles}
                  />
                </div> */}
              <Grid container style={{display:'inline-flex', }}>
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <i class="material-icons"
                style={{
                  paddingLeft: "18%",
                  paddingTop: "25%",
                  // paddingRight: "120px"
                }}
              >
                room
              </i>
              </Grid>
              <Grid  style={{paddingRight:"3%",paddingTop:"1%"}}>
                {/* <FormControl required className={classes.formControl}> */}
                   {/* <Select  style={{ fontFamily: "Roboto Regular",fontSize:'14px' }}
                        onChange={this.handleSelect}
                        defaultValue={this.state.currentLocation}
                        value={this.state.currentLocation&&this.state.currentLocation.id}  disableUnderline
                    >
                        {this.state.locations && this.state.locations.map(element => {
                            if(element.id === this.state.currentLocation){
                                return ( <MenuItem  style={{marginLeft:"2%",}} value={element.id} selected key={element.id} >
                                    {element.address_line1}
                                    </MenuItem>)
                            }else {
                           return(
                                <MenuItem value={element.id}  key={element.id} >
                           {element.address_line1}
                           </MenuItem>)
                            }
                            })}
                      </Select> */}
                      <div>
                       <Select
                          placeholder=""
                          value={locationVal}
                          options={
                            this.state.locations && this.state.locations.map(location =>{
                              return ({
                                value:location.address_line1, label:location.address_line1
                              })
                            })
                          }
                          onChange={this.handleSelect}
                          styles={customStyles}
                        />
                      </div>
                    {/* </FormControl> */}

                  </Grid>

              {/* <Select
              disableUnderline
                      value={this.state.currentLocation&&this.state.currentLocation.id}
                      onChange={this.handleSelect}
                      style={{ fontFamily: "Roboto Regular",fontSize:'16px' ,}}
                    >
                  {this.state.locations && this.state.locations.map(option => {
                    return(
                    <MenuItem
                      key={option.id}
                      value={option.id}
                    >
                      {" "}
                      {option.address_line1}
                    </MenuItem>
                   ) })}
                    </Select> */}
                    </Grid>
            </Card>
  }
            <i
              class="material-icons"
              style={{ marginLeft: "6%", marginTop: "6%" }}
            >
              notifications_none
            </i>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.viewPage}>
      <Hidden mdDown>
            <Grid item className={classes.viewProfile}>
              <Profile className={classes.profileGrid}/>
            </Grid>
          </Hidden>
        <Grid item  className={classes.viewPostForm}>
{/* <Grid item className={classes.viewDashboard}> */}
<Router history={history}>
      <Switch >
             <Redirect from="/login" to="/dashboard" />
            <Route exact path="/" component={Dashboard} />
            <Route  path="/dashboard" component={Dashboard} />
            <Route  path="/services" component={ServiceType} />
            <Route  path="/facilities" component={FacilityType} />
            <Route path="/book_facility" component={BookFacility} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/change_password" component={ChangePassword} />
            <Route path="/my_bookings/:type" component={MyActivity} />
            <Route  path="/user_profile/:profileID" component={UserProfile} />
            <Route path="/following" component={Following} />
            <Route path="/followers" component={Followers} />
            <Route path="/edit_profile" component={EditProfile} />
            </Switch>
            </Router>
            </Grid>
        {/* </Grid> */}
    </Grid>
 </Grid>
);
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export const mapStateToProps = state => locationSelector(state);
export default connect(mapStateToProps)(withStyles(design)(withRouter(Home)));
