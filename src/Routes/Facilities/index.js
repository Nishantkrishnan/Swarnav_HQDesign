import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Button,
  MenuItem,
  Select
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {Route} from "react-router-dom";
const styles = theme => ({
  cardFacilities: {
    width: "66%",
    paddingLeft: "1%",
    paddingRight: "1%",
    boxShadow: "none",
    ["@media (max-width:48em)"]: {
      width: "98%"
    }
  },
  cubeCards: {
    background: "#EDEDED",
    borderRadius: "7px",
    borderRadius: "7px",
    marginRight: "4%",
    marginLeft: "4%",
    // width: "92%",
    boxShadow: "none",
    height: "100%",
    ["@media (max-width:48em)"]: {
      height: "100%"
    }
  },
  innerCubeCards: {
    background: "#848484",
    borderRadius: "7px 7px 0 0",
    boxShadow: "none",
    height: "150px",
    ["@media (max-width:48em)"]: {
      height: "110px"
    }
    // ["@media (max-width:360px)"]: {
    //   height:'100px'

    // },
  },
  title: {
    fontFamily: "Roboto Medium",
    fontSize: "24px",
    color: "#030303",
    letterSpacing: "-0.15px",
    paddingLeft: "2%",
    paddingTop: "3%",
    paddingBottom: "3%"
  },
  innerCardTitle: {
    fontFamily: "Roboto",
    fontSize: " 18px",
    color: "#030303",
    letterSpacing: "0",
    textAlign: "center",
    paddingTop: "0.7%",
    paddingBottom: "0.7%",
    ["@media (max-width:48em)"]: {
      fontSize: "16px"
    }
  }
});
class Facilities extends React.Component {
  state = {
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
  render() {
    const { classes } = this.props;
    const { location } = this.state;
    return (
      <Card className={classes.cardFacilities}>
        <Grid container>
          <Grid item md={7}>
            <Typography className={classes.title}>Meeting Rooms</Typography>
          </Grid>

          <Grid item md={5} style={{ marginTop: "3%" }}>
            <Select
              disableUnderline
              displayEmpty
              value={this.state.locationName}
              onChange={this.handleChange("locationName")}
              style={{ marginTop: "",marginLeft:'60%',marginBottom:'10%'}}
              // className={classes.headerLocationMenu}
            >
              <MenuItem
                disabled
                value=""
                style={{ fontFamily: "Roboto Regular" }}
              >
                {" "}
                WhiteField
              </MenuItem>
              {location.map(option => (
                <MenuItem key={option.locationName} value={option.locationName}>
                  {" "}
                  {option.locationName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container style={{ marginLeft: "0%" }}>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{ boxShadow: "none" }} onClick ={() => {this.props.history.push("/meeting-room")}}>
                <CardActionArea>
                  <CardMedia
                    className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/7/original/IMG_2143.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                {" "}
                8 Seater Meeting Room -II Floor
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{ boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/6/original/20190322_112532.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                6 Seater Meeting Room -III Floor
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{ boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/5/original/20190322_112636.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                10 Seater Meeting Room -III Floor
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginLeft: "0%", marginTop: "3%", marginBottom: "3%" }}
        >
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{ boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/25/original/Telephonebooth_1_3rd_floor_jpg.png"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                {" "}
                Telephone booth
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{ boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/46/original/20_mitting_room"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                20 Seater Meeting Room -IV Floor
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}></Grid>
        </Grid>
      </Card>
    );
  }
}
Facilities.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Facilities);
