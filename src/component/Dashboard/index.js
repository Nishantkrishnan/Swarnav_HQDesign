import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Paper, Card, Button } from "@material-ui/core";
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

const styles = theme => ({
  avatarDashboard: {
    height: "60px",
    width: "60px"

    //     ['@media (max-width:48em)']: {
    //       height:'50px',
    //       width:'50px',

    //     },
    //     ['@media (max-width:22.5em)']: {
    //       height:'35px',
    //     width:'35px',

    //  },
    //  ['@media (max-width:28.5em)']: {
    //   height:'35px',
    // width:'35px',

    // },
    // ['@media (max-width:78em)']: {

    //   height:'50px',
    //   width:'50px',

    // },
    // ['@media (max-width:67em)']: {

    //   height:'50px',
    //   width:'50px',

    // },
    // ['@media (max-width:53em)']: {

    //   height:'35px',
    //   width:'35px',

    // }
  },

  name: {
    textAlign: "start",

    fontSize: "18px",
    color: "#343434",
    marginLeft: "1.8%"
  },
  date: {
    fontSize: "12px",
    color: "#979797",
    marginLeft: "4%"
  },
  iconTopRight: {
    textAlign: "end",
    marginLeft: "150%",
    background:'none',
    opacity:1.0,

    boxShadow:'none'


  },
  likeButton: {
    textTransform: "none",
    fontSize: " 16px",
    color: " #6F6F6F"
  },

  commentButton: {
    textTransform: "none",
    fontSize: " 16px",
    color: " #6F6F6F"
  },
  shareButton: {
    textTransform: "none",
    fontSize: " 16px",
    color: " #6F6F6F"
  },
  cardContent: {
    fontSize: "14px",
    color: "#4E4B4B"
  },

  sharePaper: {
    background: "#FFFFFF",
    boxShadow: "0 2px 4px 0 rgba(93,93,93,0.32)",
    borderRadius: "7px",
    borderRadius: "7px"
  },

  sharetypeButton: {
    fontSize: "14px",
    color: " #4E4B4B",
    textTransform: "none"
  },
  buttonText: {
    marginLeft: "8%",
    ["@media (max-width:22.5em)"]: {
      marginLeft: "2%"
    }
  },
  countNumbers: {
    marginTop: "2%",
    marginLeft: "0%",
    ["@media (max-width:22.5em)"]: {
      marginTop: "5%",
      marginLeft: "0%"
    }
  },
  userfeedImage: {
    marginTop: "1.2%",
    marginBottom: "1.2%"
  }
});

class Dashboard extends React.Component {
  state = {
    open: false,
    menuOpen: false
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
  toggleCommentDialogClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };
  render() {
    const { toggleCommentDialogOpen } = this;
    const { classes } = this.props;
    const { menuOpen } = this.state;

    return (
      <Grid>
        <Grid style={{ marginBottom: "1%" }}>
          <PostForm style={{ marginBottom: "5%" }} />
        </Grid>
        <Divider />
        <Card>
          <CardContent>
            <Grid container>
              <Grid item md={1} sm={1} xs={2}>
                <Avatar
                  className={classes.avatarDashboard}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJKVr--zyOdfnj0sg3c05TIUkbO-YGvljORzs4bpNfzJpOY0Y&s"
                ></Avatar>
              </Grid>
              <Grid item md={8} sm={8} xs={7} className={classes.name}>
                <Typography className={classes.name}>
                  Vishwas Mudugal
                </Typography>
                <Typography className={classes.date}>
                  November 15, 2019
                </Typography>
              </Grid>
              <Grid item md={1} sm={1} xs={1}>
                  {" "}
                  <i class="material-icons" style={{position:"relative",left:"100px"}}>keyboard_arrow_down</i>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Typography component="p" className={classes.cardContent}>
              Goodwork Labs welcomes you!!! join with us to worlds best
              Coworking environment.More than 100+ fortune IT companies and
              startups around 100000 acres of space with full facilities{" "}
            </Typography>
            <CardMedia
              className={classes.userfeedImage}
              component="img"
              image="https://pbs.twimg.com/media/C7LEiO8U4AEOPFB.jpg"
            />
            <Typography component="p"></Typography>
          </CardContent>

          <Divider />

          <CardActions>
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
                md={5}
                sm={5}
                xs={4}
                style={{ display: "inline-flex" }}
              >
                <Button className={classes.likeButton}>
                  <i class="material-icons">thumb_up</i>
                  <Typography className={classes.buttonText}>Like</Typography>
                </Button>
                <Typography className={classes.countNumbers}>120</Typography>
              </Grid>
              <Grid
                item
                md={5}
                sm={5}
                xs={5}
                style={{ display: "inline-flex" }}
              >
                <Button
                  className={classes.commentButton}
                  onClick={() => {
                    toggleCommentDialogOpen();
                  }}
                >
                  <i class="material-icons">mode_comment</i>
                  <Typography className={classes.buttonText}>
                    Comment
                  </Typography>
                </Button>
                <Typography className={classes.countNumbers}>120</Typography>
              </Grid>
              <Grid
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
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
          <CommentForm
            open={this.state.open}
            toggleCommentDialogClose={this.toggleCommentDialogClose}
          />
        </Card>
      </Grid>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
