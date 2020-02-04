import React from "react";
// import { Card, Grid, Paper, InputBase, Avatar, Typography } from "@material-ui/core";
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
import CreatePost from "./CreatePost";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import {
  FormGroup,
  FormControl,
  Modal,
} from 'react-bootstrap';
import profileSelector from "../../Routes/Home/Profile/Profile.selectors"
import { doCreatePost } from '../../Routes/Home/Dashboard/Dashboard.actions';
import ImageUploader from '../../components/ImageUpload/ImageUpload';
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
    fontSize:"16px"
  },
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
    // width: "450px",
    height: "6vh",
    marginLeft: "15px",
    ['@media (max-width:500px)']: {
      marginLeft: '5px',
    },
  },
  TextFieldCreatePost: {
    width: "",
    // height:'auto',
    marginTop:'3%',
    fontSize: "16px",
    paddingLeft:'8%',
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
class PostForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleCreatePosts: PropTypes.func,
    modalShowHide: PropTypes.bool,
    showModal: PropTypes.func,
    closeModal: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      formPosted: false,
      show: false,
      pictures: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop = (pictures) => {
    this.setState({ pictures });
  }
  getValidationState = () => { }
  createPosts = () => {
    this.props.handleCreatePosts();
    const reqBody = new FormData();
    this.state.pictures.forEach((picture) => {
      reqBody.append('media[]', picture, picture.name);
    });
    reqBody.append('post_body', this.post_body.value);
    this.props.dispatch(doCreatePost(reqBody));
    this.setState({ pictures: [] });
    this.post_body.value = null;
  }
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
    console.log(this.props,"oooooooo")
    const { classes } = this.props;
    const { toggleCreatePostDialog, toggleCreatePostDialogClose } = this;
    return (
        <Card style={{height:'4%',boxShadow:'none',background:''}}>
        <Grid container className={classes.padding}  style={{marginBottom:'0.9%',marginTop:'0.9%',marginLeft:'1%',marginRight:'1%',background:""}}>
          <Grid item lg={1} md={1} sm={1} xs={2}  style={{background:''}}>
            <Avatar
              className={classes.avatarPostForm}
              alt="suggest_user"
              src={this.props.profile.profile_image.medium}
            />
          </Grid>
          <Grid item lg={11} md={11} sm={11} xs={10} style={{background:''}}  className={classes.textTypography}>
            <Typography className={classes.textGrid} style={{}} >
            <InputBase
              style={{ paddingLeft: "4%", marginTop:'1.3%'}}
              onClick={() => this.props.showModal()}
              className={classes.inputTextPostForm}
              placeholder= "Whats on your mind?"
            /></Typography>
          </Grid>
          <Modal show={this.props.modalShowHide} onHide={this.props.closeModal}>
      <Card  style={{background:''}}
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
                 onClick={this.props.closeModal}
                  className={classes.closeButton}
                >
                  <i class="material-icons">close</i>{" "}
                </Button>
              </Grid>
            </Grid>
            <Grid container style={{ display: "inline-flex",background:"" }}>
              <Grid item md={1} sm={1} xs={2} style={{ paddingLeft: "%",background:'' }}>
                <Avatar
                  className={classes.avatarCreatePost}
                  alt="suggest_user"
                  src={this.props.profile.profile_image.medium}
                />
              </Grid>
              <Grid
                item style={{background:'black'}}
                md={10}
                sm={10}
                xs={9}
                style={{ display: "inline-flex" }}
                className={classes.textBaseCreatePost}
              >
              <Grid container>
              <Grid item lg={10} md={10} sm={10} xs={9} style={{background:""}}>
                <InputBase  multiline  rowsMax="1"  style={{textAlign:'center',marginTop:''}}
                 validationState={this.getValidationState()}
                inputRef={(ref) => { this.post_body = ref; }}
                  className={classes.TextFieldCreatePost}
                  placeholder="Whats on your mind?"
                ></InputBase>
              </Grid>
               <Grid item  lg={2}md={2} sm={2} xs={2} style={{background:''}}>
                <ImageUploader
                onChange={this.onDrop}
                // maxFileSize={10485760}
                // maxFiles={5}
                // label="Max image size: 10MB, Max images: 5, file type: jpg | jpeg | gif | png"
                withPreview
              />
              </Grid>
              </Grid>
              </Grid>
            </Grid>
            {
                this.props.formPosted ?
                <Button className={classes.submitButton}  onClick={
                  (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.createPosts();
                    this.setState({ formPosted: true });
                  }
                }>
                  <img src={'/src/images/loader.gif'} alt="..." />
                  Post</Button>
                  :
                  <Button className={classes.submitButton}  onClick={
                    (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.createPosts();
                      this.setState({ formPosted: true });
                    }
                  }>
                    Post</Button>
              }
          </CardContent>
        </Card>
      </Modal>
        </Grid>
      </Card>
    );
  }
}
PostForm.propTypes = {
  classes: PropTypes.object.isRequired
};
// export default withStyles(styles)(PostForm);
export const mapStateToProps = state => profileSelector(state);
// export default  connect(mapStateToProps)(Profile);
// export default withRouter(connect(mapStateToProps)(Home));
export default connect(mapStateToProps)(withStyles(styles)(PostForm));
