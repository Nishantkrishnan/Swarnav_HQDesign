import React from "react";
import { Card, Grid, Typography, Button, Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  BookedFacilitiesCard: {
    boxShadow: "none",
    width: "%",
    background: "",
    marginTop: "2%",
    marginLeft: "3%",
    ["@media (min-width:200px) and (max-width:1280px)"]: {
      width: "%"
    }
  },
  rightGrid: {
    marginLeft: "4%",
    marginTop: "1%",
    ["@media (min-width:200px) and (max-width:1280px)"]: {
      marginLeft: "1%"
    }
  },
  postDate:{
    fontSize:'16px',
    ["@media (max-width:400px)"]: {
    fontSize:'14px'
    }
  }
});
class BookedFacilities extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Card className={classes.BookedFacilitiesCard} style={{}}>
          <Grid container>
            <Grid item lg={4} md={4} sm={4} xs={5}>
              <Card
                style={{
                  marginLeft: "4%",
                  marginTop: "%",
                  border: "1px solid #DADADA"
                }}
              >
                <Typography
                  style={{
                    marginTop: "8%",
                    marginBottom: "4%",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  YZ907A67B708{" "}
                </Typography>
                <Card
                  style={{
                    background: "#616161",
                    color: "white",
                    marginTop: "10%"
                  }}
                >
                  <Typography style={{ textAlign: "center", marginTop: "2%" }}>
                    {" "}
                    UPCOMING
                  </Typography>
                </Card>
              </Card>
            </Grid>
            <Grid
              item
              lg={7}
              md={7}
              sm={7}
              xs={6}
              className={classes.rightGrid}
              style={{}}
            >
              <Grid container>
                <Grid
                  item
                  lg={4}
                  md={3}
                  sm={3}
                  xs={6}
                  style={{ background: "" }}
                >
                  <Typography
                    style={{
                      marginLeft: "%",
                      marginTop: "%",
                      marginBottom: "%",
                      color: "#bdbdbd"
                    }}
                  >
                    Posted For:
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  style={{ background: "" }}
                >
                  <Typography className={classes.postDate}>Dec 31,2019</Typography>
                </Grid>
              </Grid>
              <Typography style={{ marginLeft: "%" }}>
                {" "}
                11:00 AM To 12:00PM
              </Typography>

              <Button
                variant="contained"
                style={{
                  marginLeft: "%",
                  background: "#E74A3F",
                  marginTop: "1%",
                  color: "white",
                  height: "37%",
                  width: "30%"
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Card>
        <Divider
          style={{
            marginTop: "4%",
            marginBottom: "2%",
            marginLeft: "3%",
            marginRight: "3%"
          }}
        />
      </Grid>
    );
  }
}
BookedFacilities.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(BookedFacilities);
