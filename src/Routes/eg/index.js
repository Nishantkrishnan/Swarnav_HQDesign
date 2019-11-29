import React from 'react';
import {Grid,Typography} from '@material-ui/core';
class eg extends React.Component{
  render(){
    return(
      <Grid container style={{marginLeft:"6.9%",marginRight:'6.9%'}}>
      <Grid item md={3}>
        <img src="hq_logo.png"  style={{width:'100px'}}/>
      </Grid>
        <Grid item md={3}><Typography>Location</Typography></Grid>
          <Grid item md={2}><Typography style={{position:'left'}}></Typography></Grid>
          <Grid item md={3} style={{}}>
          <i class="material-icons" style={{}}>
            notifications_none
          </i>
          </Grid>
      </Grid>
    );
  }
}export default eg;
