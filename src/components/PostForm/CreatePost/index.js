import React from "react";
import {
  Grid,
  Card,
  Paper,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  InputBase,
  Input,
  IconButton,
  Typography,
  Divider,
  CardContent,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  closeButton: {
    // width: "18.7px",
    //  height: "18.7px",
  },
  input: {
   display: 'none',
 },
  cardStyle: {
    background: "#FFFFFF",
    borderRadius: "7px",
    borderRadius: "7px",

    height: "192px"
  },
  avatarCreatePost: {
    background: "#D8D8D8",
    border: "3px",
    color: "#FFFFFF",
    margin: "left",
    width: "45px",
    height: "45px",
    marginRight: "0.8%",
    marginLeft: "1.4%",
    paddingTop:'2%',
  },
  textBaseCreatePost: {
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    borderRadius: "31px",
    borderRadius: "31px",
    width: "450px",
    //height: "50px",

    marginLeft: "15px"
    // ['@media (max-width:381px)']: {
    //   width: '100%',

    // },
  },
  TextFieldCreatePost: {
    width: "inherit",
    fontSize: "16px",
    paddingLeft:'2.5%',
    ["@media (max-width:30em)"]: {
      fontSize: "11px"
    }
  },
  submitButton: {
    background: "linear-gradient(90deg, #E74A3F 0%, #E95B27 100%)",
    borderRadius: "18px",
    borderRadius: "18px",
    width: "125px",
    height: "35px",
    marginTop: "3%",
    display: "flex",
    color: "white",
    textTransform: "none",
    margin: "auto",
    fontSize:"16px",
    ["@media (max-width:40em)"]: {
      width: "80px"
    }
  }
});
class CreatePost extends React.Component {


  render() {
    const { open, toggleCreatePostDialogClose } = this.props;
    const { classes,avatarImage } = this.props;
    console.log(avatarImage,"lllllllllll")
    return (
      <Dialog open={open}>
        <Card
        //  className={classes.cardStyle}
        >
          <CardContent>
            <Grid container style={{ fontSize: "16px", marginBottom: "2%" }}>
              <Grid item md={10} sm={10} xs={9} style={{ marginLeft: "3%" }}>
                <Typography
                  style={{
                    marginTop: "1%",
                    fontSize: "18px",
                    fontFamily: "Roboto Medium"
                  }}
                >
                  Create Post{" "}
                </Typography>
              </Grid>
              <Grid
                item
                md={1}
                sm={1}
                xs={2}
                style={{ textAlign: "end", marginLeft: "2%" }}
              >
                <Button
                  onClick={() => {
                    toggleCreatePostDialogClose();
                  }}
                  className={classes.closeButton}
                >
                  <i class="material-icons">close</i>{" "}
                </Button>
              </Grid>
            </Grid>

            <Grid container style={{ display: "flex" }}>
              <Grid item md={1} sm={1} xs={0} style={{ marginLeft: "3%" }}>
                <Avatar
                  className={classes.avatarCreatePost}
                  alt="suggest_user"
                  src={this.props.avatarImage}
                />
              </Grid>

              <Grid
                item
                md={10}
                sm={10}
                xs={8}
                style={{ display: "inline-flex" }}
                className={classes.textBaseCreatePost}
              >
                <InputBase
                  multiline
                  className={classes.TextFieldCreatePost}
                  placeholder="Whats on your Mind??ppppppp"
                ></InputBase>

{/*
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        /> */}
        <label htmlFor="contained-button-file">
          <Button  component="span" style={{backgroundColor:'transparent'}} >
             <i class="material-icons">photo</i>
          </Button>
        </label>
              </Grid>
            </Grid>
            <Button className={classes.submitButton}>Post</Button>
          </CardContent>
        </Card>
      </Dialog>
    );
  }
}
CreatePost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreatePost);
