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
  cardServices:{
    width: "66%",
    paddingLeft: "1%",
     paddingRight: "1%",
      boxShadow:'none',
     ["@media (max-width:48em)"]: {
      width: "98%",

    }},
    cubeCards: {
      background: "#EDEDED",
      borderRadius: "7px",
      borderRadius: "7px",
      marginRight:'4%',
      marginLeft:'4%',
      boxShadow:'none',
      // width: "92%",

      height:'100%',
      ["@media (max-width:48em)"]: {
        height: "100%",

      },
    },
    innerCubeCards: {
      background: "#848484",
      borderRadius: "7px 7px 0 0",
      boxShadow:'none',
      height:'150px',
      ["@media (max-width:48em)"]: {
        height:'110px'

      },
    },
    title: {
      fontFamily: "Roboto Medium",
      fontSize: "24px",
      color: "#030303",
      letterSpacing: "-0.15px",
      paddingLeft: "2%",
      paddingTop: "3%",
      paddingBottom: "3%",
      boxShadow:'none',
    },
    innerCardTitle: {
      fontFamily: "Roboto",
      fontSize: " 18px",
      color: "#030303",
      letterSpacing: "0",
      textAlign: "center",
      paddingTop: "0.7%",
      paddingBottom: "0.7%",
      boxShadow:'none',
       ["@media (max-width:48em)"]: {
        fontSize:'16px'

      }}
});
class Services extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.cardServices}>
        <Typography className={classes.title}>Admin Services</Typography>
        <Grid container style={{ marginLeft: "0%" }}>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}  onClick ={() => {this.props.history.push("/admin-services")}}>
              <Card style={{boxShadow:'none'}}>
                <CardActionArea>
                  <CardMedia className={classes.innerCubeCards} 
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/13/original/Housekeeping_sub.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                {" "}
                House Keeping
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{boxShadow:'none'}}>
                <CardActionArea>
                  <CardMedia className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/3/original/admin_services_Main.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>Acs</Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{boxShadow:'none'}}>
                <CardActionArea>
                  <CardMedia className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/16/original/stationaries.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                Stationaries
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
              <Card style={{boxShadow:'none'}}>
                <CardActionArea>
                  <CardMedia className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/12/original/courier_sub.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                {" "}
                Courier
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{boxShadow:'none'}}>
                <CardActionArea>
                  <CardMedia className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/17/original/Printer_1.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                Printer
              </Typography>
            </Card>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{boxShadow:'none'}}>
                <CardActionArea>
                  <CardMedia className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/14/original/keys_sub.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                Pedestal keys
              </Typography>
            </Card>
          </Grid>
        </Grid>


        <Typography className={classes.title}>IT Services</Typography>
        <Grid container style={{ marginLeft: "0%" }}>


          <Grid item md={4} sm={4} xs={4}>
            <Card className={classes.cubeCards}>
              <Card style={{boxShadow:'none'}}>
                <CardActionArea>
                  <CardMedia className={classes.innerCubeCards}
                    component="img"
                    image="https://res.cloudinary.com/sambit-gwl/image/upload/v1/cowork_services/production/fs_images/images/10/original/other_sub.jpg"
                  />
                </CardActionArea>
              </Card>
              <Typography className={classes.innerCardTitle}>
                {" "}
              IT Support Tickets
              </Typography>
            </Card>
          </Grid>


          <Grid item md={4} sm={4} xs={4}>
          </Grid>

          <Grid item md={4} sm={4} xs={4}>
          </Grid>

        </Grid>
        <Grid
          container
          style={{ marginLeft: "0%", marginTop: "3%", marginBottom: "3%" }}
        >
          <Grid item md={4} sm={4} xs={4}>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
          </Grid>
          <Grid item md={4} sm={4} xs={4}>

          </Grid>
        </Grid>
      </Card>
    );
  }
}
Services.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Services);
