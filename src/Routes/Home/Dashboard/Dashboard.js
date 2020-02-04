import PropTypes from "prop-types";
import classNames from "classnames";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import SmartGallery from "react-smart-gallery";
import Lightbox from "react-images";
import moment from "moment";
import Loader from "containers/Loader/Loader";
import {
  getPosts,
  toggleLike,
  loadMoreComments,
  updatePost
} from "./Dashboard.actions";
import { dashboardSelector } from "./Dashboard.selectors";
import styles from "./Dashboard.css";
import CommentForm from "../../../components/CommentForm";
import ManageComment from "../../../components/ManageComment";
import PostForm from "../../../components/PostForm";
import ManagePost from "../../../components/ManagePost";
import EditPost from "../../../components/PostForm/EditPost";
import { blockLocationAndOpen } from "../Locations/Locations.actions";
import RightPanel from "../../../components/RightPanel";
import { FormGroup, FormControl, Modal } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";

import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  CardActions,
  Hidden,
  Grid,
  Avatar,
  TextField,
  Form,
  Divider,
  Button,
  MenuItem,
  InputBase,
  Input,
  Select,
  Switch
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const design = theme => ({
  postFormGrid: {
    width: "66%",
    // marginTop:"1%",
    marginLeft: "1%",

    ["@media (min-width:200px) and (max-width:1280px)"]: {
      width: "100%"
    }
    // ['@media (max-width:800px)']: {
    //   width:'100%',

    // },
  },
  rightPanelGrid: {
    width: "34%",
    marginLeft: "1%",
    marginTop: "1%"
  },
  avatarDashboard: {
    height: "50px",
    width: "50px"
  },
  name: {
    textAlign: "start",
    fontSize: "18px",
    color: "#343434",
    paddingLeft: "4%",
    marginTop: "0.5%",
    ["@media (min-width:300px ) and (max-width:400px)"]: {
      paddingLeft: "6%"
      // fontSize:'16px'
    },
    ["@media (min-width:900px ) and (max-width:1278px)"]: {
      paddingLeft: "0%"
      // fontSize:'16px'
    },
    //   ['@media (min-width:700px ) and (max-width:900px)']: {
    //     paddingLeft:'2%',
    //     // fontSize:'16px'
    // },
    ["@media (min-width:450px ) and (max-width:600px)"]: {
      paddingLeft: "0%"
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
    ["@media (min-width:300px ) and (max-width:400px)"]: {
      paddingLeft: "6%"
      // fontSize:'16px'
    },
    ["@media (min-width:900px ) and (max-width:1278px)"]: {
      paddingLeft: "0%"
      // fontSize:'16px'
    },
    //   ['@media (min-width:700px ) and (max-width:900px)']: {
    //     paddingLeft:'2%',
    //     // fontSize:'16px'
    // },
    ["@media (min-width:450px ) and (max-width:600px)"]: {
      paddingLeft: "0%"
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
    background: ""
    // marginTop:'1%',
    // ["@media (max-width:450px)"]: {
    //   left: "4%"
    // },
    // ["@media (max-width:360px)"]: {
    //   left: "4%"
    // },
  },
  likeGrid: {
    display: "inline-flex",

    background: ""
    // paddingLeft:'20%',

    // ["@media (max-width:42em)"]: {
    //   paddingLeft:'10%'
    // },
  },
  commentGrid: {
    display: "inline-flex",
    background: ""
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
    color: " #6F6F6F"
    // marginLeft:"40%",
  },
  commentButton: {
    textTransform: "none",
    fontSize: " 16px",
    color: " #6F6F6F",
    // marginLeft:"30%",
    ["@media (max-width:360px)"]: {
      // marginLeft: "-22px"
    }
  },

  cardContent: {
    fontSize: "14px",
    fontFamily: "Roboto ",
    color: "#4E4B4B"
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
    paddingLeft: "8%"
  },
  countNumbers: {
    paddingTop: "2%",
    paddingLeft: "0%"
    // ["@media (max-width:22.5em)"]: {
    //   paddingTop: "4%",
    // },
    // ["@media (max-width:414px)"]: {
    //   paddingTop: "3%",
    // },
  },
  userfeedImage: {
    marginTop: "1.2%",
    marginBottom: "1.2%"
  }
});

class Dashboard extends Component {
  state = {
    open: false,
    menuOpen: false,
    likes: 0,
    color: ""
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
    this.setState(state => ({ open: !state.open }));
  };
  handlePostLikes = () => {
    let { likes, color } = this.state;
    likes === 0 ? (likes += 1) : (likes -= 1);
    likes === 1 ? (color = "red") : (color = "");
    this.setState({
      likes,
      color
    });
  };
  toggleCommentDialogClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };
  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object,
    hasMorePosts: PropTypes.bool,
    posts: PropTypes.object,
    pageCount: PropTypes.number
  };
  static defaultProps = {
    dispatch: f => f
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: props.posts ? props.posts.user_posts : false,
      hasMoreItems: this.props.hasMorePosts,
      pageCount: 0,
      perPage: 20,
      loadMoreRequestSend: false,
      formPosted: false,
      modalShowHide: false,
      showLightBox: false,
      displayImages: [],
      selectedImgIndex: 0,
      editModalShowHide: false,
      editFormPosted: false,
      editPost: null
    };

    this.loadMore = this.loadMore.bind(this);
    this.handleCreatePosts = this.handleCreatePosts.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLightBox = this.handleLightBox.bind(this);
    this.handleThumbnailImgClick = this.handleThumbnailImgClick.bind(this);
    this.loadMoreComments = this.loadMoreComments.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getPosts(this.state.perPage));
  }
  componentDidMount() {
    document.title = "GoodWorks HQ - Dashboard";
    this.props.dispatch(blockLocationAndOpen(true));
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.posts) {
      this.setState(
        {
          posts: nextProps.posts.user_posts
        },
        () => {
          this.setState({
            loadMoreRequestSend: true,
            formPosted: false,
            editFormPosted: false,
            pageCount: nextProps.pageCount
          });
          this.closeModal();
          this.hideEditModal();
        }
      );
    }
    if (nextProps.hasMorePosts === false) {
      this.setState({ hasMoreItems: false });
    }
  };

  getValidationState = () => {};

  decodeHtml = html => {
    const divElement = document.createElement("div");
    divElement.innerHTML = html;
    // handle case of empty input
    return divElement.childNodes.length === 0
      ? ""
      : divElement.childNodes[0].nodeValue;
  };

  handleCreatePosts = () => {
    this.setState({ formPosted: true });
  };

  loadMore() {
    if (this.state.loadMoreRequestSend) {
      this.setState({ loadMoreRequestSend: false }, () => {
        this.props.dispatch(getPosts(this.state.perPage));
      });
    }
  }

  loadMoreComments = postId => {
    this.props.dispatch(loadMoreComments(postId));
  };

  handleLikeClick = (e, userPostId) => {
    e.currentTarget.classList.toggle(styles.active);
    this.props.dispatch(toggleLike(userPostId));
  };

  showModal = () => {
    this.setState({
      modalShowHide: true
    });
  };

  closeModal = () => {
    this.setState({
      modalShowHide: false
    });
  };

  handleLightBox = (images, selectedImg) => {
    const selectedImgIndex = images.findIndex(img => {
      return img === selectedImg;
    });

    const displayImages = [];
    images.map(img => {
      displayImages.push({ src: img });
    });
    this.setState(
      {
        displayImages,
        selectedImgIndex
      },
      () => {
        this.setState({ showLightBox: true });
      }
    );
  };

  handleThumbnailImgClick = index => {
    this.setState({ selectedImgIndex: index });
  };

  formatRelativeTime = unixTime => {
    const time = moment.unix(unixTime);
    if (time.isSameOrAfter(moment().startOf("day"))) {
      return time.fromNow();
    } else if (
      time.isSameOrAfter(
        moment()
          .subtract(1, "days")
          .startOf("day")
      )
    ) {
      return time.calendar();
    } else if (time.isSameOrAfter(moment().startOf("year"))) {
      return time.format("MMMM DD [at] h:mm a");
    }
    return time.format("MMMM DD, YYYY");
  };

  showEditModal = post => {
    this.setState({
      editModalShowHide: true,
      editPost: post
    });
  };

  hideEditModal = () => {
    this.setState({
      editModalShowHide: false
    });
  };

  handleUpdatePosts = (postId, postBody) => {
    console.log("Submitting...");
    this.setState({ editFormPosted: true });
    const reqBody = new FormData();
    reqBody.append("post_body", postBody);
    this.props.dispatch(updatePost(postId, reqBody));
  };

  render() {
    const { classes } = this.props;
    const {
      toggleCommentDialogOpen,
      handlePostLikes,
      handleSuggestFollow
    } = this;

    const { menuOpen, likes } = this.state;
    console.log(this.props, "kkkk");
    if (this.state.posts === null || this.props.profile === null) {
      return (
        <div>
          {" "}
          <Loader />{" "}
        </div>
      );
    }

    if (this.state.posts.length > 0) {
      return (
        <Grid>
          <Grid>
            <Grid style={{ display: "inline-flex" }}>
              <Grid className={classes.postFormGrid}>
                <Grid style={{ marginBottom: "1%" }}>
                  <PostForm
                    styles={styles}
                    formPosted={this.state.formPosted}
                    handleCreatePosts={this.handleCreatePosts}
                    modalShowHide={this.state.modalShowHide}
                    showModal={this.showModal}
                    closeModal={this.closeModal}
                  />
                </Grid>

                {this.state.posts.map(post => {
                  console.log(post, "===");
                  const imagUrls = [];
                  post.media.map(media => imagUrls.push(media.url));
                  return (
                    <Card
                      style={{
                        background: "",
                        boxShadow: "none",
                        marginBottom: "1%"
                      }}
                    >
                      <CardContent
                        style={{
                          marginLeft: "%",
                          marginRight: "%",
                          background: ""
                        }}
                      >
                        <Grid container style={{ background: "" }}>
                          <Grid
                            item
                            lg={1}
                            md={1}
                            sm={1}
                            xs={2}
                            style={{ background: "" }}
                          >
                            <Link
                              to={`/user_profile/${post.posted_by.profile_id}`}
                            >
                              <Avatar
                                style={{}}
                                className={classes.avatarDashboard}
                                src={post.posted_by.profile_image}
                              ></Avatar>
                            </Link>
                          </Grid>
                          <Grid
                            item
                            lg={10}
                            md={10}
                            sm={10}
                            xs={9}
                            style={{ background: "" }}
                          >
                            <Link
                              className={styles.postUserName}
                              to={`/user_profile/${post.posted_by.profile_id}`}
                            >
                              <Typography className={classes.name}>
                                {post.posted_by.name}
                              </Typography>
                            </Link>

                            <Typography className={classes.date}>
                              {this.formatRelativeTime(post.created_at)}
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            lg={1}
                            md={1}
                            sm={1}
                            xs={1}
                            className={classes.dropDown}
                            style={{ background: "", textAlign: "end" }}
                          >
                            {" "}
                            {post.posted_by.user_id ===
                              this.props.profile.user.id && (
                              <ManagePost
                                post={post}
                                showEditModal={this.showEditModal}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardContent
                        style={{
                          marginLeft: "1%",
                          marginRight: "1%",
                          background: ""
                        }}
                      >
                        <Typography
                          component="p"
                          className={classes.cardContent}
                        >
                          {this.decodeHtml(post.post_body)}
                        </Typography>

                        <SmartGallery
                          rootStyle={{
                            boxShadow: "20%",
                            backgroundSize: "cover",
                            border: "2px solid #FFFFFF",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center"
                          }}
                          width="800"
                          height={410}
                          images={imagUrls}
                          onImageSelect={(event, src) => {
                            this.handleLightBox(imagUrls, src);
                          }}
                        />

                        {post.media.map(postss => {
                          console.log(post, "===");
                          return <CardMedia component="img" />;
                        })}
                      </CardContent>
                      <Divider
                        style={{
                          marginLeft: "3%",
                          marginRight: "3%",
                          marginTop: "0.5%",
                          background: ""
                        }}
                      />

                      <CardActions
                        style={{
                          marginLeft: "1%",
                          marginRight: "1%"
                        }}
                      >
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
                            style={{ background: "", textAlign: "center" }}
                          >
                            <Typography
                              className={classes.likeGrid}
                              style={{ background: "" }}
                            >
                              <Button
                                className={classes.likeButton}
                                style={{}}
                                // onClick={this.handlePostLikes}
                                onClick={e => {
                                  this.handleLikeClick(e, post.post_id);
                                }}

                                // style={{color:this.state.color}}
                              >
                                <i class="material-icons">thumb_up</i>
                                <Typography style={{fontSize:'14px'}}
                                  //  className={classes.buttonText}
                                  className={classNames(styles.likeBtn, {
                                    [styles.active]: post.liked
                                  })}
                                >
                                  Like
                                </Typography>
                                <Typography>
                                {post.likes.likes_count}
                              </Typography>
                              </Button>

                            </Typography>
                          </Grid>

                          <Grid
                            item
                            lg={6}
                            md={6}
                            sm={6}
                            xs={6}
                            style={{ background: "", textAlign: "center" }}
                          >
                            <Typography className={classes.commentGrid}>
                              <Button
                                className={classes.commentButton}
                                onClick={() => {
                                  toggleCommentDialogOpen();
                                }}
                                // onClick={() => this.showModal()}
                              >
                                <i class="material-icons">mode_comment</i>
                                <Typography className={classes.buttonText} style={{fontSize:'14px'}}>
                                  Comment
                                </Typography>
                                <Typography style={{ paddingLeft:"12%",fontSize:'14px' }}>
                                {post.comments.comments_count}
                              </Typography>
                              </Button>

                            </Typography>
                            {/* <Modal show={this.state.modalShowHide} onHide={this.closeModal}>
                  <Card>hii</Card>
                </Modal> */}
                          </Grid>
                        </Grid>
                      </CardActions>
                      {this.state.open ? (

                        <Grid
                          style={{
                            paddingLeft: "3%",
                            paddingRight: "3%",
                            marginBottom: "2%",


                          }}
                        >

                          {post.comments.data.map(comment => {
                            return (
                              <Grid key={comment.comment_id} >
                                <Grid container style={{display:"inline-flex"}}>
                                  <Grid item lg={1} md={1} sm={1} xs={1}style={{marginTop:"3%"}}>
                                    <Link
                                      to={`/user_profile/${comment.profile_id}`}
                                    >
                                      <Avatar  style={{width:'55%', height:'90%', marginLeft:'40%'}}
                                        src={comment.profile_image}

                                      />
                                    </Link>
                                  </Grid>
                                  <Grid
                                    item
                                    lg={10} md={10} sm={10} xs={10}
                                    style={{
                                      paddingLeft: "2%",
                                      paddingTop: "2%"
                                    }}
                                  >
                                    <Link
                                      to={`/user_profile/${comment.profile_id}`}
                                    >
                                      {comment.commented_by}
                                    </Link>
                                    <div>
                                      {this.decodeHtml(comment.comment_body)}
                                    </div>
                                  </Grid>
                                  <Grid item lg={1} md={1} sm={1} xs={1} >
                                    {(post.posted_by.user_id ===
                                      this.props.profile.user.id ||
                                      comment.user_id ===
                                        this.props.profile.user.id) && (
                                      <ManageComment style={{background:'red'}}
                                        comment={comment}
                                        dialog={this.dialog}
                                      />
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            );
                          })}
                           {post.comments.load_more && (
                            <Link
                              to="#"
                              // className={styles.loadMoreCommentLink}
                              onClick={() => {
                                this.loadMoreComments(post.post_id);
                              }}
                            >
                             <Typography style={{marginTop:'2%',fontSize:'14px',fontFamily:'Roboto'}}> Load More comments </Typography>
                            </Link>
                          )}

                          {/* <Modal show={this.state.modalShowHide} onHide={this.closeModal}>
            <Card>hiii</Card>
          </Modal> */}
                          {
                            <CommentForm
                              postId={post.post_id}
                              profile={this.props.profile}
                              // open={this.state.open}
                              // toggleCommentDialogClose={this.toggleCommentDialogClose}
                            />
                          }
                        </Grid>
                      ) : null}
                    </Card>
                  );
                })}
              </Grid>

              <Hidden mdDown>
                <Grid className={classes.rightPanelGrid}>
                  <RightPanel />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>

          {this.state.showLightBox && (
            <Lightbox
              images={this.state.displayImages}
              isOpen={this.state.showLightBox}
              onClickPrev={() =>
                this.setState({
                  selectedImgIndex:
                    (this.state.selectedImgIndex +
                      this.state.displayImages.length -
                      1) %
                    this.state.displayImages.length
                })
              }
              onClickNext={() =>
                this.setState({
                  selectedImgIndex:
                    (this.state.selectedImgIndex + 1) %
                    this.state.displayImages.length
                })
              }
              onClose={() => this.setState({ showLightBox: false })}
              preloadNextImage
              currentImage={this.state.selectedImgIndex}
              showThumbnails
              onClickThumbnail={index => {
                this.handleThumbnailImgClick(index);
              }}
            />
          )}
          <EditPost
            styles={styles}
            editFormPosted={this.state.editFormPosted}
            handleUpdatePosts={this.handleUpdatePosts}
            editModalShowHide={this.state.editModalShowHide}
            hideEditModal={this.hideEditModal}
            editPost={this.state.editPost}
          />
        </Grid>
      );
    } else {
      return (
        <div>
          <div className={classNames("col-sm-12", styles.postUpdateFormBlock)}>
            <PostForm
              styles={styles}
              formPosted={this.state.formPosted}
              handleCreatePosts={this.handleCreatePosts}
              modalShowHide={this.state.modalShowHide}
              showModal={this.showModal}
              closeModal={this.closeModal}
            />
          </div>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export const mapStateToProps = state => dashboardSelector(state);
// export default connect(mapStateToProps)(Dashboard);

export default connect(mapStateToProps)(withStyles(design)(Dashboard));
