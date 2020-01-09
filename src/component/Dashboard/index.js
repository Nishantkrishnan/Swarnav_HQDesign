import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Paper, Card, Button,Hidden } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import CommentForm from "./CommentForm/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import PostForm from "../PostForm";
import RightPanel from "../RightPanel";
const styles = theme => ({
  postFormGrid:{width:'64%',

  ['@media (min-width:200px) and (max-width:1280px)']: {
   width:'100%',

},
// ['@media (max-width:800px)']: {
//   width:'100%',

// },
},
rightPanelGrid:{
  width:'38%',marginLeft:'1.5%',

},
  avatarDashboard: {
    height: "60px",
    width: "60px"
},
  name: {
    textAlign: "start",
    fontSize: "18px",
    color: "#343434",
    paddingLeft: "4%",
    marginTop:'0.5%',
    ['@media (min-width:300px ) and (max-width:400px)']: {
      paddingLeft:'6%',
      // fontSize:'16px'
  },
    ['@media (min-width:900px ) and (max-width:1278px)']: {
      paddingLeft:'0%',
      // fontSize:'16px'
  },
//   ['@media (min-width:700px ) and (max-width:900px)']: {
//     paddingLeft:'2%',
//     // fontSize:'16px'
// },
['@media (min-width:450px ) and (max-width:600px)']: {
  paddingLeft:'0%',
  // fontSize:'16px'
}

  //   ['@media (max-width:320px)']: {
  //     paddingLeft:'2%',
  //     fontSize:'16px'
  // }
},
  date: {
    fontSize: "12px",
    color: "#979797",
    paddingLeft: "4%",
    ['@media (min-width:300px ) and (max-width:400px)']: {
      paddingLeft:'6%',
      // fontSize:'16px'
  },
    ['@media (min-width:900px ) and (max-width:1278px)']: {
      paddingLeft:'0%',
      // fontSize:'16px'
  },
//   ['@media (min-width:700px ) and (max-width:900px)']: {
//     paddingLeft:'2%',
//     // fontSize:'16px'
// },
['@media (min-width:450px ) and (max-width:600px)']: {
  paddingLeft:'0%',
  // fontSize:'16px'
}
  },
  iconTopRight: {
    textAlign: "end",
    // marginLeft: "150%",
    background: "none",
    opacity: 1.0,
    boxShadow: "none"
  },
  dropDown: {
    position: "relative",
    background:'',
    // marginTop:'1%',
    // ["@media (max-width:450px)"]: {
    //   left: "4%"
    // },
    // ["@media (max-width:360px)"]: {
    //   left: "4%"
    // },
  },
  likeGrid:{
    display: "inline-flex",

    background:'' ,
    // paddingLeft:'20%',
    
    // ["@media (max-width:42em)"]: {
    //   paddingLeft:'10%'
    // },
   
  },
  commentGrid:{display: "inline-flex",
  background:'',
  // paddingLeft:'10%',
  // ["@media (max-width:42em)"]: {
  //     paddingLeft: "3%"
  //   },
  //   ["@media (max-width:380px)"]: {
  //     paddingLeft: "0%"
  //   },
},
  likeButton: {
    textTransform: "none",
    fontSize: " 16px",
    color: " #6F6F6F",
    // marginLeft:"40%",
  },
  commentButton: {
    textTransform: "none",
    fontSize: " 16px",
    color: " #6F6F6F",
    // marginLeft:"30%",
    ["@media (max-width:360px)"]: {
    // marginLeft: "-22px"
    },
  },

  cardContent: {
    fontSize: "14px",
    fontFamily:'Roboto ',
    color: "#4E4B4B",
    // paddingRight:'40px'
  },
  // sharePaper: {
  //   background: "#FFFFFF",
  //   boxShadow: "0 2px 4px 0 rgba(93,93,93,0.32)",
  //   borderRadius: "7px",
  //   borderRadius: "7px"
  // },
  // sharetypeButton: {
  //   fontSize: "14px",
  //   color: " #4E4B4B",
  //   textTransform: "none"
  // },
  buttonText: {
    paddingLeft: "8%",

  },
  countNumbers: {
    paddingTop: "2%",
    paddingLeft: "0%",
    // ["@media (max-width:22.5em)"]: {
    //   paddingTop: "4%",
    // },
    // ["@media (max-width:414px)"]: {
    //   paddingTop: "3%",
    // },
  },
  userfeedImage: {
    marginTop: "1.2%",
    marginBottom: "1.2%",
  }
});
class Dashboard extends React.Component {
  state = {
    open: false,
    menuOpen: false,
    likes: 0,
    color:'',
  };
  handleMenuToggle = () => {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  };
  handleMenuClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ menuOpen: false });
  };
  toggleCommentDialogOpen = () => {
    this.setState({
      ...this.state,
      open: true
    });
  };
  handlePostLikes = () => {
    let { likes,color } = this.state;
    likes === 0 ?  likes += 1 : likes-=1;
    likes===1 ? color="red" : color="";
    this.setState({
      likes,color
    });
  };
  toggleCommentDialogClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };
  render() {
    const { toggleCommentDialogOpen, handlePostLikes,handleSuggestFollow } = this;
    const { classes } = this.props;
    const { menuOpen, likes } = this.state;
    return (
      <Grid  style={{display:'inline-flex'}}>
        <Grid className={classes.postFormGrid}>
        <Grid style={{ marginBottom: "1%" }}>
          <PostForm style={{  }} />
        </Grid>
        {/* <Divider /> */}
        <Card  style={{background:'',boxShadow:'none',}} >
          <CardContent style={{
              marginLeft:'%',
              marginRight:'%',
              background:''
            }}>
            <Grid container style={{background:''}}>
              <Grid item lg={1} md={1} sm={1} xs={2} style={{ background:''}}>
                <Avatar style={{}}
                  className={classes.avatarDashboard}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJKVr--zyOdfnj0sg3c05TIUkbO-YGvljORzs4bpNfzJpOY0Y&s"
                ></Avatar>
              </Grid>
              <Grid item lg={10} md={10} sm={10} xs={9}  style={{background:''}}>
                <Typography className={classes.name} >
                  Vishwas Mudagal
                </Typography>
                <Typography className={classes.date}>
                  November 15, 2019
                </Typography>
              </Grid>
              <Grid item lg={1} md={1} sm={1} xs={1} className={classes.dropDown} style={{background:'',textAlign:'end'}}>
                {" "}
                <i class="material-icons">keyboard_arrow_down</i>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent style={{
              marginLeft:'1%',
              marginRight:'1%',
              background:''
              // marginBottom:'1.2%',
            }}>
            <Typography component="p" className={classes.cardContent}>
              Goodwork Labs welcomes you!!! join with us to worlds best
              Coworking environment.More than 100+ a  fortune IT companies and
              startups around 100000 acres of space with full facilities{" "}
            </Typography>
            <CardMedia
              className={classes.userfeedImage}
              component="img"
              image="https://miro.medium.com/max/2616/1*FVfdYFOkVlf2lPswre6iXg.jpeg"
            />
            {/* <Typography component="p"></Typography> */}
          </CardContent>
          <Divider style={{marginLeft:'3%',marginRight:'3%',marginTop:'0.5%',background:''}} />
          <CardActions style={{
              marginLeft:'1%',
              marginRight:'1%',
              // marginBottom:'1.2%',
            }}>
            <Grid
              container
              style={{
                textTransform: "none",
                fontSize: " 16px",
                color: " #6F6F6F"
              }}
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={5}
                style={{ background:'',textAlign:'center'}}
              > 
              <Typography className={classes.likeGrid} style={{ background:''}} >
                                <Button
                  className={classes.likeButton}
                  style={{}}
                  onClick={this.handlePostLikes}
                  style={{color:this.state.color}}
                >
                  <i class="material-icons">thumb_up</i>
                  <Typography
                   className={classes.buttonText}
                   >
                     Like</Typography>
                </Button>
                <Typography style={{paddingTop:'7.5%'}}
                // className={classes.countNumbers} 
                >
                  {likes}
                </Typography>
                </Typography>

              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                 style={{ background:'',textAlign:'center'}}
              >
                <Typography className={classes.commentGrid}>
                <Button 
                  className={classes.commentButton}
                  onClick={() => {
                    toggleCommentDialogOpen();
                  }}
                >
                  <i class="material-icons">mode_comment</i>
                  <Typography 
                  className={classes.buttonText}
                  >
                    Comment
                  </Typography>
                </Button>
                <Typography style={{paddingTop:'4.5%'}}
                // className={classes.countNumbers}
                >120</Typography>
                </Typography>
              </Grid>
              {/* <Grid
                item
                md={2}
                sm={2}
                xs={3}
                style={{ display: "inline-flex" }}
              >
                <Button
                  className={classes.shareButton}
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={menuOpen ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenuToggle}
                >
                  <Popper
                    open={menuOpen}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom"
                        }}
                      >
                        <Paper className={classes.sharePaper}>
                          <ClickAwayListener onClickAway={this.handleMenuClose}>
                            <MenuList>
                              <MenuItem onClick={this.handleMenuClose}>
                                <Button className={classes.sharetypeButton}>
                                  Share in Timeline
                                </Button>
                              </MenuItem>
                              <MenuItem onClick={this.handleMenuClose}>
                                {" "}
                                <Button className={classes.sharetypeButton}>
                                  Copy Link{" "}
                                </Button>
                              </MenuItem>
                              <MenuItem onClick={this.handleMenuClose}>
                                <Button className={classes.sharetypeButton}>
                                  Share via...
                                </Button>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  <i class="material-icons">reply</i>
                  <Typography className={classes.buttonText}>Share</Typography>
                </Button>
                <Typography
                  style={{ marginTop: "5%" }}
                  className={classes.countNumbers}
                >
                  120
                </Typography> */}
              {/* </Grid> */}
            </Grid>
          </CardActions>
          <CommentForm
            open={this.state.open}
            toggleCommentDialogClose={this.toggleCommentDialogClose}
          />
        </Card>
        </Grid>
        <Hidden mdDown>
        <Grid className={classes.rightPanelGrid}>
          <RightPanel/>
        </Grid>
        </Hidden>
      </Grid>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Dashboard);
