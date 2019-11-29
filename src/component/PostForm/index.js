import React from "react";
import { Card, Grid, Paper, InputBase, Avatar } from "@material-ui/core";
import CreatePost from './CreatePost';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
 
padding:{
  padding: "10px" 
},
avatarPostForm:{
  background: "#D8D8D8",
  border: "3px",
  color: "#FFFFFF",
  margin: "left",
  height:'45px',
  width:'45px',
//   ['@media (max-width:48em)']: {
//     height:'45px',
//     width:'45px'
   
   
//   },
//   ['@media (max-width:22.5em)']: { 
//     height:'40px',
//     width:'40px'
// },
},
inputTextPostForm:{
  background: "#FFFFFF",
  border: "1px solid #DADADA",
  borderRadius: "31px",
  borderRadius: "31px",
  height: "110%",
  width: "350%",
  marginLeft:'10%',
//   ['@media (max-width:22.5em)']: { 
//     width: '50%',
   
//   marginLeft:'5%',
// marginRight:'1%'},
//   ['@media (max-width:48em)']: {
//     width: '320%',
   
   
//   },

// ['@media (max-width:30em)']: { 
//   width:'250%',
//   marginLeft:'15%'

// },
// ['@media (max-width:75em)']: { 
  
//   marginLeft:'10%'

// },
// ['@media (max-width:62.2em)']: { 
  
//   marginLeft:'20%'

// }
},

 
});
class PostForm extends React.Component {
  state={
    open:false
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
    const { classes } = this.props
    const { toggleCreatePostDialog,toggleCreatePostDialogClose} = this;
    return (
      <Card >
        <Grid container className={classes.padding}>
          <Grid item md={1} sm={1} xs={2}>
            <Avatar
              className={classes.avatarPostForm}
              alt="suggest_user"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJKVr--zyOdfnj0sg3c05TIUkbO-YGvljORzs4bpNfzJpOY0Y&s"
            />
          </Grid>

          <Grid item md={3} sm= {3}xs={2} className={classes.inputTextGrid}>
            <InputBase style={{marginLeft:'10px'}}
            onClick ={() => {
              toggleCreatePostDialog();
            }}
              className={classes.inputTextPostForm}
              placeholder="Whats on your mind?"

            />
          </Grid>
          <CreatePost open ={this.state.open} toggleCreatePostDialogClose={this.toggleCreatePostDialogClose}/>
        </Grid>
      </Card>
    );
  }
}
PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostForm);
