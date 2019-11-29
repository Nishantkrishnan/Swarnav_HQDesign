import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  serviceCard: {
    marginBottom: "1.5%",
    marginTop: "1%"
  },
  serviceInnerCard: {
    height: "291px",
    marginBottom: "1.8%"
  },
  serviceTitle: {
    fontSize: "20px",
    color: "#030303",
    letterSpacing: "-0.13px",
    marginLeft:'2%',
    marginTop:'1.8%',
    marginBottom:'1.1%'
  },
  serviceSubTitle: {
    fontSize: "14px",
    color: "#030303",
    letterSpacing: "-0.09px",
    marginLeft:'2%',
    marginBottom:'2.3%'

  }
});
class Services extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Card className={classes.serviceCard}>
          <Card className={classes.servicesInnerCard}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/3/original/admin_services_Main.jpg"
              />
            </CardActionArea>
          </Card>

          <Typography className={classes.serviceTitle}>
            Admin Facilities
          </Typography>

          <Typography className={classes.serviceSubTitle}>
            Click here to raise a ticket for housekeeping, AC, courier, printer,
            stationery, etc.
          </Typography>
        </Card>

        <Card className={classes.serviceCard}>
          <Card className={classes.servicesInnerCard}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/2/original/it_services_xl.png"
              />
            </CardActionArea>
          </Card>

          <Typography className={classes.serviceTitle}>
            Admin Facilities
          </Typography>

          <Typography className={classes.serviceSubTitle}>
            Click here to raise IT support ticket.
          </Typography>
        </Card>
      </Grid>
    );
  }
}
Services.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Services);
