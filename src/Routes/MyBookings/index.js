import React from "react";
import {Card,Grid,Button,Typography,Divider} from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card:{
    background: "#FFFFFF",
borderRadius: "7px",
borderRadius: "7px"
},
buttonText:{
  fontSize: "16px",
color: "#343434",
textTransform:'none'
},
button:{
  marginTop:'1.3%',
  marginLeft:'1.9%',
  marginRight:'1.7%',
  marginBottom:'10%'
}

});
class MyBookings extends React.Component{
  render(){
    const { classes } = this.props;
    return(
      <Card className={classes.card}>
      <Grid container style={{backgroundColor:'#f5f5f5'}}>

      <Grid item md={1}style={{marginRight:'5%'}}>
      <Button className={classes.button}><Typography className= {classes.buttonText}>Services</Typography></Button>
      </Grid>

      <Grid item md={10}>
      <Button><Typography className= {classes.buttonText}>Facilities</Typography></Button>
      </Grid>
      </Grid>

      </Card>



    );
  }
}
MyBookings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyBookings);
