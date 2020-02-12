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
    // margin: "left",
    width: "50px",
    height: "50px",
    // marginRight: "0.8%",
    // marginLeft: "1.4%",
    marginTop:'10%',
    ["@media (min-width:200px) and (max-width:375px)"]: {
      marginTop:'5%'
    },
    ["@media (min-width:500px) and (max-width:800px)"]: {
      marginTop:'30%'
    },
    ["@media (min-width:800px) and (max-width:1024px)"]: {
      marginTop:'60%'
    },
    // marginTop:"35%"
  },
  textBaseCreatePost: {
    background: "#FFFFFF",
    border: "1px solid #DADADA",
    borderRadius: "31px",
    borderRadius: "31px",
    // width: "450px",
     height: "8vh",
    marginLeft: "20px",

    ['@media (max-width:500px)']: {
      marginLeft: '5px',
    },
  },
  textFieldCreatePost: {
    textAlign:'center',overflow:"hidden",background:'',
    width:"400px",
    ["@media (min-width:300px) and (max-width:380px)"]: {
      width:'182px'
    },
    ["@media (min-width:380px) and (max-width:500px)"]: {
      width:'220px'
    },
    marginTop:"2%",marginBottom:'2%',
    // height:'auto',
    // marginTop:'50px',
    // position:'relative',
    fontSize: "16px",
    paddingLeft:'3%',
    ["@media (max-width:30em)"]: {
      fontSize: "11px"
    }
  },
  submitButton: {
    background: "#E74A3F",
    border: "1px solid #DADADA",
    borderRadius: "31px",
    borderRadius: "31px",
    display: "flex",
    marginTop: "2%",
    paddingLeft: "6%",
    paddingRight: "6%",
    color: "white",
    fontSize: "16px",
    textTransform: "none",
    margin:'auto',
    marginBottom:"4%"
    // background: "linear-gradient(90deg, #E74A3F 0%, #E95B27 100%)",
    // borderRadius: "18px",
    // borderRadius: "18px",
    // width: "125px",
    // height: "35px",
    // marginTop: "3%",
    // marginBottom:'2%',
    // display: "flex",
    // color: "white",
    // textTransform: "none",
    // margin: "auto",
    // fontSize:"16px",
    // ["@media (max-width:40em)"]: {
    //   width: "80px"
    // },
  },
  modalCard:{
    height:"",
    overflow:"hidden",
    ["@media (max-width:40em)"]: {
      width: "100%"
    },
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
      emptyPost:false,
      post: '',
      error:''
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop = (pictures) => {
    this.setState({ pictures });
  }
  getValidationState = () => { }
  createPosts = () => {
    if(this.state.post.length >= 1){
      console.log("succes");
    this.props.handleCreatePosts();
    const reqBody = new FormData();
    this.state.pictures.forEach((picture) => {
      reqBody.append('media[]', picture, picture.name);
    });
    reqBody.append('post_body', this.state.post);
    this.props.dispatch(doCreatePost(reqBody));
    this.setState({ pictures: [] });
    this.post_body.value = null;
  }

  else {
    console.log("error");
    this.setState({error:'Please type something...'})
  }
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
              style={{ paddingLeft: "3%", marginTop:'1%',width:''}}
              onClick={() => this.props.showModal()}
              className={classes.inputTextPostForm}
              placeholder= "Whats on your mind?"
            /></Typography>
          </Grid>
          <Modal show={this.props.modalShowHide} onHide={this.props.closeModal} className={classes.modalCard}>
      <Card  style={{background:''}}
        >
          <CardContent style={{marginLeft:'1%',background:''}} >
            <Grid container style={{marginBottom:'2%'}}>
              <Grid item md={11} sm={11} xs={10} style={{ marginLeft: "%" }}>
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
                style={{ textAlign:'end', marginLeft: "%",background:'' }}
              >
                <Button
                 onClick={this.props.closeModal}
                  className={classes.closeButton}
                >
                  <i class="material-icons">close</i>{" "}
                </Button>
              </Grid>
            </Grid>
            <Typography style={{ color: 'red',marginLeft:'2%',fontFamily:'Roboto', fontSize:'14px',marginTop:'2%', marginBottom:'2%' }}>{this.state.error}</Typography>
            <Grid container style={{ display: "inline-flex",background:"" }}>
              <Grid item md={1} sm={1} xs={2} style={{ paddingLeft: "%",marginLeft:"%" ,background:''}}>
                <Avatar
                  className={classes.avatarCreatePost}
                  alt="suggest_user"
                  src={this.props.profile.profile_image.medium}
                />
              </Grid>
              <Grid
                item style={{}}
                md={10}
                sm={10}
                xs={9}
                style={{ display: "inline-flex",overflow:"hidden" }}
                className={classes.textBaseCreatePost}
              >
              {/* <Grid container>
              <Grid item lg={10} md={10} sm={10} xs={9} style={{background:"",}}> */}

                <InputBase  multiline  rowsMax="4"  style={{}}
                 validationState={this.getValidationState()}
                    required= "true"
                // inputRef={(ref) => { this.post_body = ref; }}
                  className={classes.textFieldCreatePost}
                  placeholder="Whats on your mind?"
                    onChange={e => this.setState({ post: e.target.value, emptyPost: false })}
                ></InputBase>

              {/* </Grid> */}
              </Grid>
              </Grid>
            {/* </Grid> */}
          </CardContent>
          <Grid >
           <ImageUploader
           onChange={this.onDrop}
           // maxFileSize={10485760}
           // maxFiles={5}
           // label="Max image size: 10MB, Max images: 5, file type: jpg | jpeg | gif | png"
           withPreview
         />
         </Grid >

         {this.state.emptyPost && <p style={{ color: 'red' }}>Please type something...</p>}
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
                <Button

                 className={classes.submitButton}  onClick={
                  (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.createPosts();
                    this.setState({ formPosted: true });
                  }
                }>
                  Post</Button>
            }

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
