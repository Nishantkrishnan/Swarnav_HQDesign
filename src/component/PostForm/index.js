import React from "react";
import { Card, Grid, Paper, InputBase, Avatar, Typography } from "@material-ui/core";
import CreatePost from "./CreatePost";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  padding: {
    padding: "10px"
  },
  avatarPostForm: {
    background: "#D8D8D8",
    border: "3px",
    color: "#FFFFFF",

    height: "45px",
    width: "45px",
  //   ['@media (min-width:950px) and (max-width:1275px)']: {
  //     height: "55px",
  //     width: "55px",

  // }


  },
  textTypography:{
    // width:'110%',
    paddingLeft:'0%',
    ['@media (max-width:80em)']: {
      // paddingLeft:'-50%',

  }
  },
  textGrid:{
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    borderRadius: "31px",
    borderRadius: "31px",
    // width:'97%',
    height:'95%',
    marginRight:"3%" ,
    marginLeft:'1%' ,
    ['@media (min-width:900px) and (max-width:1279px)']: {
      marginLeft:"-20px"

  },
  ['@media (min-width:450px) and (max-width:600px)']: {
    marginLeft:"-20px"

},

  },
  inputTextPostForm: {
  //  marginLeft:'150%'
  }
});
class PostForm extends React.Component {
  state = {
    open: false
  };
  toggleCreatePostDialog = () => {
    const { open } = this.state;
    this.setState({
      ...this.state,
      open: true
    });
  };
  toggleCreatePostDialogClose = () => {
    const { open } = this.state;
    this.setState({
      ...this.state,
      open: false
    });
  };
  render() {
    const { classes } = this.props;
    const { toggleCreatePostDialog, toggleCreatePostDialogClose } = this;
    return (
      <Card style={{height:'4%',boxShadow:'none',background:''}}>
        <Grid container className={classes.padding}  style={{marginBottom:'0.9%',marginTop:'0.9%',marginLeft:'1%',marginRight:'1%',background:""}}>
          <Grid item lg={1} md={1} sm={1} xs={2}  style={{background:''}}>
            <Avatar
              className={classes.avatarPostForm}
              alt="suggest_user"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJKVr--zyOdfnj0sg3c05TIUkbO-YGvljORzs4bpNfzJpOY0Y&s"
            />
          </Grid>
          <Grid item lg={11} md={11} sm={11} xs={10} style={{background:''}}  className={classes.textTypography}>
            <Typography className={classes.textGrid} style={{}} >
            <InputBase
              style={{ paddingLeft: "4%", marginTop:'1.3%'}}
              onClick={() => {
                toggleCreatePostDialog();
              }}
              className={classes.inputTextPostForm}
              placeholder= "Whats on your mind?"
            /></Typography>
          </Grid>
          <CreatePost
            open={this.state.open}
            toggleCreatePostDialogClose={this.toggleCreatePostDialogClose}
          />
        </Grid>
      </Card>
    );
  }
}
PostForm.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(PostForm);
