import React from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
// import styles from "./index.css"
import { spacing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import { unstable_Box } from "@material-ui/core/Box";
import { shadows } from "@material-ui/system";
import Dashboard from "../../component/Dashboard";
import RightPanel from "../../component/RightPanel";
import Profile from "../../component/Profile";
import PostForm from "../../component/PostForm";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Card,
  FormLabel,
  MenuItem,
  TextField,
  Select
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CommentForm from "../../component/Dashboard/";
import Facilities from "../Facilities";
import MyBookings from "../MyBookings";
import Services from "../Services";
import MeetingRooms from "../Facilities/MeetingRooms";
import AdminServices from "../Services/AdminServices";
import Booked from "../../component/Booked"
import MenuDrawer from "./MenuDrawer";
const styles = theme => ({
  displayBlock: {
    display: "block"
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
    // ["@media (max-width:768px)"]: {
    //   height: "35px"
    // },
    // ["@media (max-width:450px)"]: {
    //   height: "35px",
    //   width: "50px"
    // },
    ["@media (max-width:360px)"]: {
      height: "35px"
      // width: "35px"
    }
  },
  headerLocation: {
    fontSize: " 16px",
    color: "#7C7C7C"
  },
  headerLocationMenu: {
    // ["@media (max-width:420px)"]: {
    //   fontSize: "14px",
    //   marginTop: "0%",
    //   marginBottom: "4%",
    //   left: "-42px",
    //   fontFamily: "Roboto"
    // }
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
    height:'100vh'
  },
  viewProfile: {
    marginLeft: "6.9%",
    marginTop: "1%",
    width: "18.1%",
    // ["@media (max-width:48em)"]: {
    //   width: "100%",
    //   marginLeft: "1%",
    //   marginRight: "1%"
    // }
  },
  viewPostForm: {
    marginLeft: "1%",
    marginTop: "0.5%",
    width: "66%",

    ['@media (min-width:200px) and (max-width:1280px)']: {
      width: "100%",
      marginLeft: "1%",
      marginRight: "1%"
    }
  },
  viewDashboard: {
    marginTop: "1%"
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
    // ["@media (max-width:48em)"]: {
    //   width: "100%",
    //   marginLeft: "1%",
    //   marginRight: "1%"
    // }
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
class Home extends React.Component {
  state = {
    textColor: "red",
    textDecoration: "none",
    locationName: "",
    location: [
      {
        locationName: "WhiteField",
        locationId: "01"
      },
      {
        locationName: "Indira Nagar",
        locationId: "02"
      }
    ]
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
  render() {
    const { classes, history } = this.props;
    const { location, textColor, flagValue, flag } = this.state;
    const { changeColor, underlineOnLink } = this;
    console.log(textColor, "hhhhh");
    return (
      <Grid >
        <Grid className={classes.topHeader} style={{}}>
          <Grid
            container
            style={{
              display: "inline-flex",
              
              // marginTop: "0.5%",
              // marginBottom: "0.5%",
            }}
          >
<Hidden lgUp>
              <Grid item  lg={1} md={1} sm={1} xs={1} style={{background:''}}>
                <MenuDrawer />
              </Grid>
            </Hidden>

            <Hidden lgUp>
              <Grid item lg={10} md={8} sm={7} xs={4} className={classes.gridmobileLogo}>
                <Button>
                  <img src="hq_mobile.png" className={classes.headerLogo} />
                </Button>
              </Grid>
            </Hidden>




            <Hidden mdDown>
              <Grid item lg={10} md={10} sm={9} xs={6} style={{}}>
                <Button>
                  <img src="hq_logo.png" className={classes.headerLogo} />
                </Button>
              </Grid>
            </Hidden>
            {/* <Grid item md={10} sm={9} xs={6} style={{}}>
              <Button>
                <img src="hq_logo.png" className={classes.headerLogo} />
              </Button>
            </Grid> */}
            <Grid
            lg={2}
              md={3}
              sm={4}
              xs={7}
              style={{ textAlign: "end", display: "inline-flex" }}
            >
              <Card
                style={{
                  width: "80%",
                  height: "75%",
                  textAlign: "start",
                  marginTop: "2%",
                  background: "#e0e0e0",
                  display: "inline-flex",
                    boxShadow:'none',
                }}
              >
                <i
                  class="material-icons"
                  style={{
                    marginLeft: "4%",
                    marginTop: "3%",
                    marginRight: "4%"
                  }}
                >
                  room
                </i>
                <Select
                  disableUnderline
                  displayEmpty
                  value={this.state.locationName}
                  onChange={this.handleChange("locationName")}
                  style={{ marginTop: "" }}
                  // className={classes.headerLocationMenu}
                >
                  <MenuItem
                    disabled
                    value=""
                    style={{ fontFamily: "Roboto Regular" }}
                  > WhiteField</MenuItem>
                  {location.map(option => (
                    <MenuItem
                      key={option.locationName}
                      value={option.locationName}
                    >
                      {" "}
                      {option.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </Card>
              <i
                class="material-icons"
                style={{ marginLeft: "8%", marginTop: "5%" }}
              >
                notifications_none
              </i>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid md={7} sm={12} xs={12} className={classes.listGrid}>
          <Grid container className={classes.list} spacing={2}>
            <Grid item md={2} xs={2.5}>
              <Link
                to="/"
                style={
                  window.location.pathname === "/"
                    ? {
                        textTransform: "none",
                        color: "red",
                        fontSize: "16px",
                      }
                    : {
                        textTransform: "none",
                        textDecoration: "none",
                        color: "black"
                      }
                } onclick ={classes.underlineOnLink}
              >
                Home
              </Link>
            </Grid>
            <Grid item md={2} xs={2.5}>
              <Link
                to="/mybookings"
                style={
                  window.location.pathname === "/mybookings"
                    ? {
                        textTransform: "none",
                        color: "red",
                        fontSize: "16px"
                      }
                    : {
                        textTransform: "none",
                        textDecoration: "none",
                        color: "black"
                      }
                } onclick ={underlineOnLink}
              >
                MyBooking
              </Link>
            </Grid>
            <Grid item md={2} xs={2.5}>
              <Link
                to="/services"
                style={
                  window.location.pathname === "/services"
                    ? {
                        textTransform: "none",
                        color: "red",
                        fontSize: "16px"
                      }
                    : {
                        textTransform: "none",
                        textDecoration: "none",
                        color: "black"
                      }
                }onclick ={underlineOnLink}
              >
                Services
              </Link>
            </Grid>
            <Grid item md={2} xs={2.5}>
              <Link
                to="/facilities"
                style={
                  window.location.pathname === "/facilities"
                    ? {
                        textTransform: "none",
                        color: "red",
                        fontSize: "16px"
                      }
                    : {
                        textTransform: "none",
                        textDecoration: "none",
                        color: "black"
                      }
                }
                onclick ={underlineOnLink}
              >
                Facilities
              </Link>
            </Grid>
            <Grid item md={2} xs={2.5}>
              <Link
                style={
                  window.location.pathname === "/feedback"
                    ? {
                        textTransform: "none",
                        textDecoration: "none",
                        color: "red",
                        fontSize: "16px"
                      }
                    : {
                        textTransform: "none",
                        textDecoration: "none",
                        color: "black"
                      }
                } onclick ={underlineOnLink}
              >
                Feedback
              </Link>
            </Grid>
          </Grid> */}
        {/* </Grid> */}
        <Grid container className={classes.viewPage}>
          <Hidden mdDown>
            <Grid item className={classes.viewProfile}>
              <Profile />
            </Grid>
          </Hidden>
          <Grid item className={classes.viewPostForm}>
            <Typography className={classes.viewDashboard}>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/mybookings" component={MyBookings} />
              <Route exact path="/facilities" component={Facilities} />
              <Route exact path = "/meeting-room" component = {MeetingRooms} />
              <Route exact path = "/admin-services" component = {AdminServices} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/booked" component={Booked}/>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
