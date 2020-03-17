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
            paddingTop: "3%",
            paddingLeft: "3%",
            paddingRight: "3%",
            paddingBottom: "3%",
            borderRadius:"2%",
            boxShadow:"none",
            height:"100%"
          }}
        >

        <Grid container>
        <Grid item md={10}>

        <Typography
            style={{
              fontSize: "16px",
              marginTop:"2%",
              fontFamily: "Roboto Medium",
              textAlign: "center",
              color: "#E74A3F",
              justifyContent: "center",
              position:""
            }}
          >
            Are you Sure, you want to logout
          </Typography>
        </Grid>

        <Grid item md={2}>
        <Button
          style={{


            fontSize: "14px",
            color: "",
            textAlign: "center",
            marginBottom: "2%"
          }}
          onClick={() => {
            toggleCreatePostDialogClose();
          }}
        >

        <i class="material-icons">
        close
        </i>
        </Button>

        </Grid>

        </Grid>






          <Grid
            container
            style={{
              display: "inline-flex",
              marginTop: "18%",
              justifyContent: "flex-end"
            }}
          >


            <Grid item md={12}>
              {" "}
              <Button
                style={{
                  background: "#E74A3F",
                  textTransform: "none",
                  fontSize: "14px",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "2%",
                  marginLeft: "40%",
                  position:"center",

                }}
              >
                <Link
                  style={{
                    background: "#E74A3F",
                    textTransform: "none",
                    fontSize: "14px",
                    color: "white",
                    textAlign: "right"
                  }}
                  to="/"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.destroySession();
                  }}
                >
                  PROCEED
                </Link>
              </Button>
            </Grid>
          </Grid>{" "}
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
