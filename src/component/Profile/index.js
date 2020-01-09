import React from "react";
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
import MyBookings from "../../Routes/MyBookings";
import Services from "../../Routes/Services";
import Facilities from "../../Routes/Facilities";
import Dashboard from "../Dashboard";
const styles = theme => ({
  innerCard: {
    background: "#E74A3F",
    borderRadius: "7px 7px 0 0",
    borderRadius: "7px 7px 0px 0px",
    height: "82px",
    position: "relative",
    boxShadow:'none',
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

class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card style={{boxShadow:'none'}}>
        <Card className={classes.innerCard}>
          <Typography className={classes.username}>Vishwas Mudagal</Typography>
        </Card>

        <Avatar
          className={classes.avatar}
          style={{ transform: "translate(4%, -50%)" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJKVr--zyOdfnj0sg3c05TIUkbO-YGvljORzs4bpNfzJpOY0Y&s"
        />
        <Typography className={classes.listItem} style={{ marginTop: "21.4%" }}>
          <i class="material-icons" style={{ marginTop: "4px" }}>
            home
          </i>
          <Link
            className={classes.linkTitle}
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
            to="/mybookings"
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
            className={classes.linkTitle}
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
          <i class="material-icons">more_horiz</i>
          <Link className={classes.linkTitle}>More </Link>
        </Typography>
      </Card>
    );
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
