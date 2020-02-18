// import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Image, Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Loader } from '../../../containers/Loader/Loader';
import profileSelector from './Profile.selectors';
import { fetchProfile, updateProfileImg } from './Profile.actions';
import styles from './Profile.css';
import ImageUploader from '../../../components/ImageUpload/ImageUpload';
// import { Card, Avatar, Paper } from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card, Avatar, Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { logOut } from '../../Landing/Login/Login.actions';
import LogoutDialog from "../../../components/LogoutDialog"
const design = theme => ({
  topSection:{
    background:"transparent ! important"
  },
  gridProfile: {
    background: "#E74A3F",
    borderRadius: "7px 7px 0 0",
    borderRadius: "7px 7px 0px 0px",
    margin:0
,    height: "82px",
    boxShadow: 'none',
    display:"grid"
  },
  username: {
    fontFamily: "Roboto Medium",
    fontSize: "16px",
    color: "#FFFFFF",
    textTransform:"none",
    paddingTop: "2%"
  },
  avatar: {

    width: "70px",
    height: "70px",

  },
  gridList:{
    marginTop: "21%" ,marginBottom:'10%'
  },
  textTypography:{
    marginTop:"%",marginLeft:"9%",fontSize:"18px"
  },
  linkTitle: {
    marginLeft: "11.5%",
    marginBottom: "7%",
    color: "#A1A1A1",

    display:"flex",
    textDecoration: "none",
    fontFamily: "Roboto Regular",

  }
});
class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
    profile: null,
    pictures: [],
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: props.profile,
      showModal: false,
      formPosted: false,
      open: false,
    };
    this.props.dispatch(fetchProfile());
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.updateProfilePic = this.updateProfilePic.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile,
      formPosted: false,
    });
    this.handleClose();
  }
  componentDidMount() {
    document.title = "GoodWorks HQ - Profile";
  }
  onDrop = (pictures) => {
    this.setState({ pictures });
  }
  handleClose = () => {
    this.setState({ showModal: false });
  }
  handleShow = () => {
    this.setState({ showModal: true });
  }
  updateProfilePic = () => {
    const reqBody = new FormData();
    this.state.pictures.forEach((picture) => {
      reqBody.append('profile_image', picture, picture.name);
    });
    this.props.dispatch(updateProfileImg(reqBody));
  }
  destroySession = () => {
    this.props.dispatch(logOut({ userToken: null }));
  }
  toggleCreatePostDialog = () => {
    const { open } = this.state;
    this.setState({
      ...this.state,
      open: true
    });
  };
  toggleCreatePostDialogClose = () => {
    const { open } = this.state;
    this.setState({
      ...this.state,
      open: false
    });
  };
  render() {
    const { classes } = this.props;
    if (this.state.profile === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    return (
      <div>
        <Card style={{ boxShadow: 'none' }}>
        <Grid className={classes.gridProfile}>
            <Button className={classes.topSection}>
    <Typography className={classes.username}>{this.state.profile.user.first_name} {this.state.profile.user.last_name}</Typography>
    </Button>
    <Button className={classes.topSection}>
    <Avatar
          className={classes.avatar}

          src={this.state.profile.profile_image.medium}
        >
          </Avatar>
          </Button>
          </Grid>
<Grid  className={classes.gridList}>
<Link
            className={classes.linkTitle}
              onClick={()=>window.location.href='/'}
            to="/"

          >
          <i class="material-icons"   style={
              window.location.pathname === "/"
                ? {
                    textTransform: "none",
                    color: "red",
                    // fontSize: "25px",
                    textDecoration: "none",

                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            } >
            home
          </i>

          <Typography className={classes.textTypography}
          style={
              window.location.pathname === "/"
                ? {
                    textTransform: "none",
                    color: "red",
                    fontSize: "18px",
                    textDecoration: "none",
                    marginTop:"0%"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }
            >  Home</Typography>
          </Link>


        <Link
            className={classes.linkTitle}
              onClick={()=>window.location.href='/my_bookings/services'}
            to="/my_bookings/services"

          >
          <i class="material-icons"  style={
              window.location.pathname === "/my_bookings/services"
                ? {
                    textTransform: "none",
                    color: "red",
                    // fontSize: "18px",
                    textDecoration: "none"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }>history</i>

           <Typography  className={classes.textTypography}
           style={
              window.location.pathname === "/my_bookings/services"
                ? {
                    textTransform: "none",
                    color: "red",
                    fontSize: "18px",
                    textDecoration: "none",
                    marginTop:"0%"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }
            > MyBooking </Typography>
          </Link>


        <Link
            className={classes.linkTitle}
              onClick={()=>window.location.href='/services'}
            to="/services"

          >
          <i class="material-icons"   style={
              window.location.pathname === "/services"
                ? {
                    textTransform: "none",
                    color: "red",
                    // fontSize: "18px",
                    textDecoration: "none"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }>brightness_5</i>

           <Typography   className={classes.textTypography}
           style={
              window.location.pathname === "/services"
                ? {
                    textTransform: "none",
                    color: "red",
                    fontSize: "18px",
                    textDecoration: "none",
                    marginTop:"0%"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }> Services </Typography>
          </Link>


        <Link
            className={classes.linkTitle}
            onClick={()=>window.location.href='/facilities'}
            to="/facilities"

          >
          <i class="material-icons"   style={
              window.location.pathname === "/facilities"
                ? {
                    textTransform: "none",
                    color: "red",
                    // fontSize: "18px",
                    textDecoration: "none"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }>star_border</i>

          <Typography    className={classes.textTypography}
          style={
              window.location.pathname === "/facilities"
                ? {
                    textTransform: "none",
                    color: "red",
                    fontSize: "18px",
                    textDecoration: "none",
                    marginTop:"0%"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }>  Facilities </Typography>
          </Link>


        <Link
            onClick={()=>window.location.href='/feedback'}
            className={classes.linkTitle} to="/feedback"

          >
          <i class="material-icons"   style={
              window.location.pathname === "/feedback"
                ? {
                    textTransform: "none",
                    textDecoration: "none",
                    color: "red",
                    // fontSize: "18px"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }>feedback</i>

          <Typography    className={classes.textTypography}
          style={
              window.location.pathname === "/feedback"
                ? {
                    textTransform: "none",
                    textDecoration: "none",
                    color: "red",
                    fontSize: "18px",
                    marginTop:"0%"
                  }
                : {
                    textTransform: "none",
                    textDecoration: "none"
                  }
            }> Feedback </Typography>
          </Link>

        <Link
            className={classes.linkTitle} to="/logout"
            onClick={() => {
              this.toggleCreatePostDialog();
            }}
            // onClick={
            //   (e) => {
            //   e.preventDefault();
            //   e.stopPropagation();
            //   this.destroySession();
            //   this.toggleCreatePostDialog();
            // }}

            >
          <i class="material-icons">power_settings_new</i>

          <Typography  className={classes.textTypography}>  Logout</Typography>
          </Link>
          <LogoutDialog
            open={this.state.open}
            toggleCreatePostDialogClose={this.toggleCreatePostDialogClose}
          />
       </Grid>
        </Card>
      </div>
    );
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};
export const mapStateToProps = state => profileSelector(state);
// export default  connect(mapStateToProps)(Profile);
// export default withRouter(connect(mapStateToProps)(Home));
export default connect(mapStateToProps)(withStyles(design)(Profile));
