import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  facilityCard: {
    background: "#D8D8D8",
    borderRadius: "7px 7px 0 0",

    marginBottom: "1.8%"
  },
  outerCard: {
    background: "#FFFFFF",
    borderRadius: "7px",
    borderRadius: "7px",


    marginTop: "1.5%"
  },
  meetingRoomTitle: {
    fontSize: "20px",
    color: "#030303",
    letterSpacing: "-0.13px",
    marginTop: "1.8%",
    marginBottom: "1.1%",
    marginLeft: "2%",
    textAlign: "start"
  },
  meetingRoomSubTitle: {
    fontSize: "14px",
    color: "#030303",
    letterSpacing: "-0.09px",
    marginLeft: "2%",
    textAlign: "start"
  },
  image:{
    height:'29.8%',
    ['@media (max-width:360px)']: {
      height:'39.8%',

    },
  }
});
class Facilities extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.outerCard}>
        <Card className={classes.facilityCard}>
          <CardActionArea >
            <CardMedia
              component="img"
              image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/1/original/Meeting_Room_outside_main.jpg"
            />
          </CardActionArea>
        </Card>

        <Typography className={classes.meetingRoomTitle}>
          Meeting Rooms
        </Typography>

        <Typography className={classes.meetingRoomSubTitle}>
          Click here to view all meeting rooms and book your slot
        </Typography>
      </Card>
    );
  }
}
Facilities.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Facilities);
