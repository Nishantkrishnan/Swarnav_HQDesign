import React from "react";
import {Card,Grid,Button,Typography,Divider} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BookedFacilities from "./BookedFacilities";
import BookedServices from "./BookedServices";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const styles = theme => ({
  card:{
  
background: "white",
borderRadius: "7px",
borderRadius: "7px",
boxShadow:"none",
width:"66%",
["@media (max-width:48em)"]: {
      width:'100%'
    },
},
buttonText:{
  fontSize: "16px",
color: "#343434",
textTransform:'none',
marginBottom:'15%'
},
button:{
  // marginTop:'1.3%',
  // marginLeft:'1.9%',
  // marginRight:'1.7%',
  // marginBottom:'4%',
  background:'transparent'
}
});
class MyBookings extends React.Component{

  render(){
    const { classes } = this.props;
    return(
      <Card className={classes.card} >
      <Grid container style={{backgroundColor:'#f5f5f5'}}>
      <Grid item md={2} style={window.location.pathname === "/mybookings/services" ?{background:'white',
      marginRight:'%',marginTop:'%'}:{marginRight:'%',marginTop:'%',background:''}}>
      <Button className={classes.button} onClick = {() => {this.props.history.push("/mybookings/services")}}>
      <Typography className= {classes.buttonText}>Services</Typography></Button>
      </Grid>
      <Grid item md={10} style={window.location.pathname === "/mybookings/facilities" ?{background:'white'}:
      {background:''}}>
      <Button className={classes.button} onClick = {() => {this.props.history.push("/mybookings/facilities")}}>
      <Typography className= {classes.buttonText}>Facilities</Typography></Button>
      </Grid>
      </Grid>
      <Route exact path="/mybookings/facilities" component={BookedFacilities} />
      <Route exact path="/mybookings/services" component={BookedServices} />
      </Card>
    );
  }
}
MyBookings.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MyBookings);
