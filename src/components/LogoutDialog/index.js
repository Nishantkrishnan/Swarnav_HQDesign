import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Grid,
  Button,
  Dialog,
  Icon
} from "@material-ui/core";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { logOut } from '../../Landing/Login/Login.actions';
import { logOut } from "../../Routes/Landing/Login/Login.actions";
// import profileSelector from './Profile.selectors';
import profileSelector from "../../Routes/Home/Profile/Profile.selectors";

const design = theme => ({});

class LogoutDialog extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func
  };
  static defaultProps = {
    dispatch: f => f
  };

  constructor(props, context) {
    super(props, context);
    this.destroySession = this.destroySession.bind(this);
  }

  destroySession = () => {
    this.props.dispatch(logOut({ userToken: null }));
  };

  render() {
    const { open, toggleCreatePostDialogClose } = this.props;
    const { classes } = this.props;
   
   
   
   
    return (
      <Dialog
        open={open}
        style={{ height: "70%" }}
        onClose={toggleCreatePostDialogClose}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
        <Card
          style={{
            width: "400px",
            // paddingTop: "3%",
            // paddingLeft: "3%",
            // paddingRight: "3%",
            // paddingBottom: "3%",
            borderRadius:"0%",
            boxShadow:"none",
            height:"100%"
          }}
        >

         <Card  style ={{background:"#F3251F",  boxShadow:"none",}}>
         <Typography style={{color:"white",marginTop:"2%",marginBottom:'2%',textAlign:'center',fontFamily:'Roboto Medium',fontSize:"16px"}}>  LOGOUT  </Typography>
         </Card>

        <Typography
            style={{
              fontSize: "18px",
              marginTop:"15%",
              fontFamily: "Roboto Medium",
              textAlign: "center",
              color: "#333333",
              justifyContent: "center",
              position:""
            }}
          >
           Are you sure you want to logout ?
          </Typography>
      
      
    
         <Grid container>

<Grid item md={6}>  </Grid>
<Grid item md={3}  style={{background:""}}>
   <Button
          style={{


            fontSize: "14px",
            color: "green",
            marginBottom: "10%",
            marginTop:"30%",
            marginLeft:'50px'
          }}
          onClick={() => {
            toggleCreatePostDialogClose();
          }}
        >

       NO
        </Button>  </Grid>

<Grid item md={3}>
<Button
                style={{
                  background: "",
                  textTransform: "none",
                  fontSize: "14px",
                  color: "white",
                  
                  marginBottom: "10%",
                  marginTop:"30%",
                
                  color:'red'

                }}
              >
                <Link
                  style={{
                    background: "",
                    textTransform: "none",
                    fontSize: "14px",
                    color: "white",
                    textAlign: "right",
                    color:"red"
                  }}
                  to="/"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.destroySession();
                  }}
                >
                  YES
                </Link>
              </Button>
    </Grid>
         </Grid>


        </Card>
      </Dialog>
    );
  }
}
LogoutDialog.propTypes = {
  classes: PropTypes.object.isRequired
};
export const mapStateToProps = state => profileSelector(state);
export default connect(mapStateToProps)(withStyles(design)(LogoutDialog));
