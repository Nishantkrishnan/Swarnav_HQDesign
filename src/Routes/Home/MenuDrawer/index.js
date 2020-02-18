import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Grid, ListItem,Typography } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DrawerProfile from "./DrawerProfile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logOut } from '../../Landing/Login/Login.actions';
import profileSelector from '../Profile/Profile.selectors';
import { connect } from 'react-redux';
// import LogoutDialog from "../../../components/LogoutDialog"
import LogoutDialog from "../../../components/LogoutDialog"
const styles = {
  list: {
      width: 250,
    },
  listItems: {
    marginTop: "2.4%",
    marginLeft: "11.5%",
    marginBottom: "4.9%",
    fontFamily: "Roboto",
    fontSize: "18px",
    color: "#A1A1A1",
    width:'250px'
  },
  linkTitle: {
    color: "#A1A1A1",
    marginLeft: "7%",
    position: "absolute",
    left: "56px",
    textDecoration: "none",
    fontFamily: "Roboto Regular",
    fontSize: "18px"
  },
  fullList: {
    width: "auto"
  }
};
class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };
  constructor(props, context) {
    super(props, context);
    this.destroySession = this.destroySession.bind(this);
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  destroySession = () => {
    console.log("logout calling");
    this.props.dispatch(logOut({ userToken: null }));
  console.log("logout called");
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
      <Grid  item md={1} style={{paddingTop:'20%'}}>
        <Button onClick={this.toggleDrawer("left", true)}>
          <i class="material-icons">menu</i>
        </Button>
        </Grid>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
        <Grid >
          <DrawerProfile />
          <Grid
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
          <Typography className={classes.listItems} style={{ marginTop: "21.4%" }}>
            <i class="material-icons" style={{ marginTop: "4px" }}    onClick={()=>window.location.href='/'}>
              home
            </i>
            <Link
              className={classes.linkTitle}
               onClick={()=>window.location.href='/'}
              to="/"
              style={
                window.location.pathname === "/"
                  ? {
                      textTransform: "none",
                      color: "red",
                      fontSize: "16px",
                      textDecoration: "none"
                    }
                  : {
                      textTransform: "none",
                      textDecoration: "none"
                    }
              }
            >
              Home
            </Link>
          </Typography>
          <Typography className={classes.listItems}>
          <i class="material-icons">
history
</i>
            <Link
              className={classes.linkTitle}
onClick={()=>window.location.href='/my_bookings/services'}
              to="/my_bookings/services"
              style={
                window.location.pathname === "/my_bookings/services"
                  ? {
                      textTransform: "none",
                      color: "red",
                      fontSize: "16px",
                      textDecoration: "none"
                    }
                  : {
                      textTransform: "none",
                      textDecoration: "none"
                    }
              }
            >
              MyBooking
            </Link>
          </Typography>
          <Typography className={classes.listItems}>
            <i class="material-icons">brightness_5</i>
            <Link
              className={classes.linkTitle}
                onClick={()=>window.location.href='/services'}
              to="/services"
              style={
                window.location.pathname === "/services"
                  ? {
                      textTransform: "none",
                      color: "red",
                      fontSize: "16px",
                      textDecoration: "none"
                    }
                  : {
                      textTransform: "none",
                      textDecoration: "none"
                    }
              }
            >
              Services
            </Link>
          </Typography>
          <Typography className={classes.listItems}>
            <i class="material-icons">star_border</i>
            <Link
              className={classes.linkTitle}
                onClick={()=>window.location.href='/facilities'}
              to="/facilities"
              style={
                window.location.pathname === "/facilities"
                  ? {
                      textTransform: "none",
                      color: "red",
                      fontSize: "16px",
                      textDecoration: "none"
                    }
                  : {
                      textTransform: "none",
                      textDecoration: "none"
                    }
              }
            >
              Facilities
            </Link>
          </Typography>
          <Typography className={classes.listItems}>
            <i class="material-icons">feedback</i>
            <Link  to="/feedback"
              className={classes.linkTitle}
                onClick={()=>window.location.href='/feedback'}
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
                      textDecoration: "none"
                    }
              }
            >
              Feedback
            </Link>
          </Typography>
          <Typography className={classes.listItems}>
            <i class="material-icons">power_settings_new</i>
            <Link  to="/logout"
              className={classes.linkTitle}
              onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.destroySession();
          }}
            >
            Logout
            </Link>
            <LogoutDialog
            open={this.state.open}
            toggleCreatePostDialogClose={this.toggleCreatePostDialogClose}
          />
          </Typography>
          </Grid>
          </Grid>
        </SwipeableDrawer>
      </Grid>
    );
  }
}
SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};
export const mapStateToProps = state => profileSelector(state);
export default connect(mapStateToProps,null) (withStyles(styles)(SwipeableTemporaryDrawer));
