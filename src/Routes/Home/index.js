import React from "react";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import styles from "./index.css"
import { spacing } from "@material-ui/system";
import Button from '@material-ui/core/Button';
import { unstable_Box } from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
import Dashboard from "../../component/Dashboard";
import RightPanel from "../../component/RightPanel";
import Profile from "../../component/Profile";
import PostForm from "../../component/PostForm";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Card, FormLabel,MenuItem,TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {BrowserRouter as Router,Route,Link} from "react-router-dom"
import CommentForm from "../../component/Dashboard/";
import Facilities from "../Facilities"
import MyBookings from "../MyBookings"
import Services from "../Services";
const styles = theme => ({
  displayBlock: {
    display: 'block'
  },
  topHeader: {

    marginLeft:'6.9%',
    marginRight:'6.9%',



  },
  headerLogo:{
    marginTop:'5%',
    height:'41px',
    display: 'inline-flex',

  ['@media (max-width:768px)']: {

  height:'35px'
  },
  ['@media (max-width:450px)']: {

    height:'15px',
    width:'50px'


    },
  },
headerGrid:{


},
  headerLocation: {


    fontSize: ' 16px',
    color: '#7C7C7C',
    marginTop:'20px',
    ['@media (max-width:460px)']: {

      fontSize:'14px',
      marginTop:'10px',

      },
  },
  headerLocationMenu:{
    marginTop:'6%',
    
   
    ['@media (max-width:360px)']: {

      fontSize:'14px',
      marginTop:'0%',
      marginBottom:'4%'
     
    
     

      },
  },
  iconRight: {
    width: '0.7%',
    height: '1.2%',
    float:'right',

    ['@media (max-width:360px)']: {

      width: '0.7%',
    height: '0.7%',
    },


  },
  listGrid: {
    textAlign: 'start',
    marginTop:'1.5%',
    marginBottom:'1.5%',
    marginLeft: "6.9%",
    marginRight:'6.9%'

  },
  list: {
    height: '1.1%',
    textTransform: 'none',
    textDecoration: 'none',
    fontSize:'16px'
,

    fontSize: '16px'
    , color: ' #343434',
    ['@media (max-width:45em)']: {

      marginLeft: '0%',
      marginRight: '0%',
      fontSize: '12px',

    },
    ['@media (max-width:22.5em)']: {

      marginLeft: '0%',
      marginRight: '0%',
      fontSize: '12px',

    },
  },
  listt:{
    display:'inline-flex',


  },
  viewPage: {
    backgroundColor: "#eeeeee"
  },
  viewProfile: {
    marginLeft: '6.9%',
    marginTop: "1%",
    width: "18.1%",
    ['@media (max-width:48em)']: {
      width: '100%',
      marginLeft: '1%',
      marginRight: '1%'
    },

  },
  viewPostForm: {
    marginLeft: '1%',
    marginTop: "1%",
    width: '41.7%',

    ['@media (max-width:48em)']: {
      width: '100%',
      marginLeft: '1%',
      marginRight: '1%'
    },

  },
  viewDashboard: {
    marginTop: "1%",
  },
  viewRightPanel: {
    marginTop: "1%",
    marginLeft: '1%',
    width: "24.3%",
    marginRight: '6.9%',
    ['@media (max-width:48em)']: {
      width: '100%',
      marginLeft: '1%',
      marginRight: '1%'
    },


  }

});
class Home extends React.Component {
  state = {
    textColor:null,
    flag:true,
    flagValue:true,
    location: [
      {
        locationName: "WhiteField",
        locationId: "01"
      },
      {
        locationName: "Indira Nagar",
        locationId: "02"
      },

    ]
  };
changeColor=()=>{
const {textColor,flagValue,flag}=this.state
this.setState({
  textColor:'red',
  flagValue:flagValue,
  flag:flag
})
  }


  render() {
    const { classes } = this.props
    const {location,textColor,flagValue,flag} =this.state
    const {changeColor}=this
    return (


        <Grid >
            <Grid className={classes.topHeader}>
            <Grid container style={{ display: 'inline-flex',marginTop:'0.5%',marginBottom:'0.5%' }} >
              <Grid item  md={11} sm={10} xs={10} >
                <Grid container style={{ display: 'inline-flex', }}>
                  <Grid item md={2} sm={4} xs={4} >
                    <Button ><img src="hq_logo.png"  className={classes.headerLogo}/></Button>
                  </Grid>
                  <Grid item md={2} sm={4} xs={8} className={classes.headerGrid} >
                    <Grid container  >
                    <Grid md={5} sm={5} xs={6} style={{}} >
                    <Typography  className={classes.headerLocation} style={{}} >Location:</Typography>
                    </Grid>
                    <Grid md={7} sm={7} xs={6} style={{color:'red'}}>
                    <TextField   select  className={classes.headerLocationMenu} >
                      {location.map(option => (
                        <MenuItem
                          key={option.locationName}
                          value={option.locationName}
                        > {option.locationName}</MenuItem>
                      ))}
                    </TextField>
                    </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid md={1} sm={2} xs={2} style={{ marginTop: '0.9%', marginBottom: '0.9%',display:'inline-flex'}}>
                {/* <Button className={classes.iconRight}> */}
                 <i class="material-icons"  style={{}}>
                    notifications_none
</i>
                  <i class="material-icons" style={{position:'absolute',right:'8%'}} >
                    person
</i>
              </Grid>
            </Grid>
            </Grid>
            <Divider />

            <Grid md={7} sm={12} xs={12} className={classes.listGrid}>

                <Grid container className={classes.listt} spacing={2}>
                  <Grid item  md={2} xs={2.5}>  {(flagValue&& flag)?<Link to='/'  className={classes.list} onClick={()=>{changeColor()}} style={{
                    color:textColor
                  }}> Home</Link>:null}</Grid>
                  <Grid item md={2} xs={2.5}><Link to ='/mybookings' className={classes.list} onClick={()=>{changeColor()}} style={{
                    color:textColor
                  }}>MyBooking</Link></Grid>
                  <Grid item md={2} xs={2.5}><Link to='/services' className={classes.list}onClick={()=>{changeColor()}} style={{
                    color:textColor
                  }}>Services</Link></Grid>
                  <Grid item  md={2} xs={2.5}><Link to='/facilities' className={classes.list}onClick={()=>{changeColor()}} style={{
                    color:textColor
                  }}>Facilities</Link></Grid>
                  <Grid item md={2} xs={2.5}><Link className={classes.list}onClick={()=>{changeColor()}} style={{
                    color:textColor
                  }}>Feedback</Link></Grid>
                  </Grid>


            </Grid>

          <Grid container className={classes.viewPage} >
            <Grid item className={classes.viewProfile}
            > <Profile /></Grid>
            <Grid item className={classes.viewPostForm}>
              <Typography className={classes.viewDashboard}>
              <Route exact path='/' component={Dashboard} />
          <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/mybookings' component={MyBookings} />
          <Route exact path='/facilities' component={Facilities} />
          <Route exact path='/services' component={Services} />
          </Typography>
            </Grid>
            <Grid item className={classes.viewRightPanel}><RightPanel /></Grid>
          </Grid>
        </Grid>

    )
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);
