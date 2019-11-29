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
import Hidden from '@material-ui/core/Hidden';
const styles = theme => ({
  profileCard: {
    background: "#FFFFFF",
    borderRadius: "7px",
    borderRadius: "7px"
  },

  profileAvatar: {
    height: "102px",
    width: "102px",
    margin: "auto",
    marginTop: "1.5%",
    marginBottom: "1.6%"
  },
  profileName: {
    fontSize: "22px",
    color: "#343434",
    textAlign: "center",
    marginTop: "1.6%",
    marginBottom: "0.5%"
  },
  profileDetails: {
    fontSize: "14px",
    color: "#939393",
    textAlign: "center",
    marginTop: "0.5%",
    marginBottom: "0.5%",
  },

  profileFollow: {
    fontSize: "16px",
    color: "#343434",
    marginTop: "25px",
    marginBottom: "0.7%",
    textAlign:'center'
  },

  profileFollowersCount: {
    fontSize: "20px",
    color: "#E74A3F",
    marginBottom: "1.6%",
    textAlign:'center'
  }
});

class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.profileCard}>
        <CardActionArea style={{ postion: "center" }}>
          <Avatar
            className={classes.profileAvatar}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJKVr--zyOdfnj0sg3c05TIUkbO-YGvljORzs4bpNfzJpOY0Y&s"
          />
        </CardActionArea>

        <Typography className={classes.profileName}>
          Vishwas Mudugal{" "}
        </Typography>
        <Typography className={classes.profileDetails}>CEO</Typography>
        <Typography className={classes.profileDetails}>
          GoodWorkLabs Pvt.Ltd
        </Typography>


        <Grid container>
        <Hidden xsDown>
          <Grid item xs={6}>
            {" "}
            <Typography className={classes.profileFollow}>Following</Typography>
            <Typography className={classes.profileFollowersCount}>
              250
            </Typography>
          </Grid>{" "}
          <Grid item xs={6}>
            {" "}
            <Typography className={classes.profileFollow} x>
              Followers
            </Typography>
            <Typography className={classes.profileFollowersCount}>
              250
            </Typography>
          </Grid>
          </Hidden>
        </Grid>
      </Card>
    );
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
