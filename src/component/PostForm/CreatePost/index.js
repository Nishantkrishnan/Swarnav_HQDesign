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
  Typography,Divider,
  CardContent,TextField
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
 closeButton:{
  width: "18.7px",
   height: "18.7px"
 },
 cardStyle:{
  background: "#FFFFFF",
  borderRadius: "7px",
  borderRadius: "7px",
  width: "555px",
  height: "192px"
 },
 avatarCreatePost:{
  background: "#D8D8D8",
  border: "3px",
  color: "#FFFFFF",
  margin: "left",
  width: "45px",
  height: "45px",
  marginRight:'0.8%',
  marginLeft:"1.4%"
 },
 textBaseCreatePost:{
  background: "#FFFFFF",
  border: "1px solid #DADADA",
  borderRadius: "31px",
  borderRadius: "31px",
  width: "450px",

  marginLeft: "15px",

 },
 submitButton:{
  background:'linear-gradient(90deg, #E74A3F 0%, #E95B27 100%)',
borderRadius: "18px",
borderRadius: "18px",
width: "125px",
height: "30px",
marginTop: "3%",
display:'flex',



textTransform: "none",
margin:'auto'
 }



});
class CreatePost extends React.Component {
  render() {
    const { open, toggleCreatePostDialogClose} = this.props;
    const { classes } = this.props
    return (
      <Dialog open={open}>


        <Card
        //  className={classes.cardStyle}
        >
          <CardContent>
          <Grid container>
          <Grid item xs={10}>
          <DialogTitle>Create Post </DialogTitle></Grid>
          <Grid item xs={2} style={{textAlign:'end'}}>
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

          <Grid container style={{display:'flex'}}>
            <Grid item md={1} sm={1} xs={2} >
              <Avatar
               className={classes.avatarCreatePost}
                alt="suggest_user"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxZBPYRjymq6dVrtmKk1lxRU1g-IfyFgb-OH-N-be0dVBOyTjD&s
"
              />
            </Grid>



<Grid  style={{display:'inline-flex'}} className={classes.textBaseCreatePost} >
              <InputBase multiline
         style={{marginLeft:'2%',marginTop:'5px', width:"inherit"}} placeholder="Whats on your Mind??">
              </InputBase>

              <IconButton className={classes.iconButton} aria-label="Search">
      <i  class="material-icons">photo</i>
     </IconButton>

</Grid>




          </Grid>
          <Button
           className={classes.submitButton}
          >
            Post
          </Button>
          </CardContent>
        </Card>
      </Dialog>
    );
  }
}
CreatePost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreatePost);
