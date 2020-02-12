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
  username:{
    fontSize:"28px !important",
    color :" #333333",
    textAlign: "center",
    marginTop: "3%"
},
  innerCard: {
    background: "#E74A3F",
    borderRadius: "7px 7px 0 0",
    borderRadius: "7px 7px 0px 0px",
    height: "82px",
    position: "relative",
    boxShadow: 'none',
  },
  username: {
    fontFamily: "Roboto Medium",
    fontSize: "18px",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: "3%"
  },
  avatar: {
    left: "0%",
    right: "68%",
    width: "70px",
    height: "70px",
    margin: "auto",
    position: "absolute"
  },
  listItem: {
    marginTop: "2.4%",
    marginLeft: "11.5%",
    marginBottom: "4.9%",
    fontFamily: "Roboto",
    fontSize: "18px",
    color: "#A1A1A1"
  },
  linkTitle: {
    color: "#A1A1A1",
    marginLeft: "7%",
    position: "absolute",
    left: "84px",
    textDecoration: "none",
    fontFamily: "Roboto Regular",
    fontSize: "18px"
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
          <Card className={classes.innerCard}>
    <Typography className={classes.username}>{this.state.profile.user.first_name} {this.state.profile.user.last_name}</Typography>
          </Card>
          <Avatar
          className={classes.avatar}
          style={{ transform: "translate(4%, -50%)" }}
          src={this.state.profile.profile_image.medium}
        />
<Typography className={classes.listItem} style={{ marginTop: "21.4%" }}>
          <i class="material-icons" style={{ marginTop: "4px" }}>
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
                    fontSize: "18px",
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
        <Typography className={classes.listItem}>
          <i class="material-icons">speaker_notes</i>
          <Link
            className={classes.linkTitle}
              onClick={()=>window.location.href='/my_bookings/services'}
            to="/my_bookings/services"
            style={
              window.location.pathname === "/mybookings"
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

        <Typography className={classes.listItem}>
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
        <Typography className={classes.listItem}>
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

        <Typography className={classes.listItem}>
          <i class="material-icons">feedback</i>
          <Link
            onClick={()=>window.location.href='/feedback'}
            className={classes.linkTitle} to="/feedback"
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


        <Typography className={classes.listItem}>
          <i class="material-icons">power_settings_new</i>
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


            Logout
          </Link>
          <LogoutDialog
            open={this.state.open}
            toggleCreatePostDialogClose={this.toggleCreatePostDialogClose}
          />
        </Typography>

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
