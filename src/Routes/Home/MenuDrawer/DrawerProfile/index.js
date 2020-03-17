import React from "react";
import { Card, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import axios from "axios";
import { authInfo } from "../../../../utils/config";

// import { connect } from 'react-redux';
// import profileSelector from './Profile.selectors';
// import { fetchProfile, updateProfileImg } from './Profile.actions';

const design = theme => ({
  profileCard: {
    background: "#FFFFFF",
    border: "none"
  },

  profileAvatar: {
    height: "61px",
    width: "61px",
    margin: "auto",
    marginTop: "3.5%",
    marginBottom: "1.6%"
  },
  profileName: {
    fontSize: "22px",
    fontFamily: "Roboto Medium",
    color: "#343434",
    textAlign: "center",
    marginTop: "1.6%",
    marginBottom: "0.5%"
  },
  profileDetails: {
    fontSize: "14px",
    fontFamily: "Roboto Regular",
    color: "#939393",
    textAlign: "center",
    marginTop: "1.0%",
    marginBottom: "1.5%"
  },

  profileFollow: {
    fontSize: "16px",
    fontFamily: "Roboto Medium",
    color: "#343434",
    marginTop: "10px",
    marginBottom: "0.3%",
    textAlign: "center"
  },

  profileFollowersCount: {
    fontSize: "20px",
    color: "#E74A3F",
    fontFamily: "Roboto Medium",
    marginBottom: "11.6%",
    textAlign: "center",
    marginBottom: "6.6%",
    marginTop: "1.0%"
  }
});

class DrawerProfile extends React.Component {
  // .then(res => res.data);
  state: {
    userdata: ""
  };
  setProfileData() {
    axios
      .get(`${authInfo.mainUrl}/api/v1/profiles/`, {
        headers: {
          "X-Auth-Token": localStorage.getItem("coworks-accessToken-remember")
        }
      })
      .then(res => {
        console.log(res.data, "data is coming");
        console.log(res.data.data, "data is coming");
        localStorage.setItem("profileData", JSON.stringify(res.data));
        this.setState({ data: res.data.data });
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    let profileData = JSON.parse(localStorage.getItem("profileData"));
    if (profileData) {
      this.setState({ data: profileData.data });
    } else {
      this.setProfileData();
    }
  }

  render() {
    const { classes } = this.props;
    const { userdata } = this.state || {};
    console.log("mobile_user_data", this.state);

    // let {profile={}} = this.props;
    // profile=profile||{}
    // const {profile_image={}, user={} } = profile;
    // const {email, designation,first_name,last_name,organization_name} =user;
    return (
      <Grid>
        <CardActionArea style={{ postion: "center" }}>
          <Avatar
            className={classes.profileAvatar}
             src={this.state&&this.state.data&&this.state.data.profile_image&&this.state.data.profile_image.medium&&this.state.data.profile_image.medium}
          />
        </CardActionArea>

        <Typography className={classes.profileName}>
          {this.state && this.state.data && this.state.data.user.first_name}    
          {this.state && this.state.data && this.state.data.user.last_name}
        </Typography>

        <Typography
          style={{
            fontSize: "13px",
            fontFamily: "Roboto Medium",
            color: "red",
            textAlign: "center"
          }}
        >
          {this.state && this.state.data && this.state.data.user.email}
        </Typography>

        <Typography className={classes.profileDetails}></Typography>
        <Typography className={classes.profileDetails}>
          {this.state &&
            this.state.data &&
            this.state.data.user.organization_name}
        </Typography>

        <Grid container>
          <Grid item xs={6}>
            {" "}
          </Grid>{" "}
          <Grid item xs={6}>
            {" "}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
DrawerProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

// export const mapStateToProps = state => profileSelector(state);

export default withStyles(design)(DrawerProfile);
