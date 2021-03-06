// import React from "react";
// import { Typography, Grid} from "@material-ui/core";
// import CardContent from "@material-ui/core/CardContent";
// import { Paper, Card, Dialog, DialogTitle } from "@material-ui/core";
// import InputBase from "@material-ui/core/InputBase";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import { doComment } from './CommentForm.actions';
// import classNames from 'classnames';
// import { connect } from 'react-redux';
// import {
//   Form,
//   FormGroup,
//   ControlLabel,
//   FormControl,
//   Button,
//   Col,
// } from 'react-bootstrap';
// import styles from './CommentForm.css';
// const design = theme => ({
//   avatarComment: {
//     marginTop: "3%",
//     marginLeft: "1.4%",
//     marginRight: "0.8%"
//   },
//   InputBaseCommentForm: {
//     border: "1px solid #DADADA",
//     borderRadius: "31px",
//     width: "100%",
//     paddingLeft:'2%',
//     // marginLeft: "10px",
//     marginTop: "1.8%"
//   },
//   dialogTitle: {
//     fontSize: "18px",
//     fontFamily: "Roboto Medium",
//     color: "#343434",
//     marginTop: "2.6%",
//     marginLeft: "1.4%",
//     marginBottom: "3%"
//   },
//   closeIcon: {
//     width: "18.7px",
//     height: "18.7px",
//     marginTop: "1.3%",
//     marginRight: "2.3%"
//   },
//   buttonCommontForm: {
//     background: "linear-gradient(90deg, #E74A3F 0%, #E95B27 100%)",
//     textTransform: "none",
//     borderRadius: "18px",
//     marginTop: "2.4%",
//     position: "center",
//     marginBottom: "2%",
//     width: "125px",
//     height: "35px",
//     textAlign: "center",
//     alignItems: "center",
//     display: "flex",
//     margin: "auto",
//     color:'white'
//   },
//   username: {
//     fontSize: "16px",
//     fontFamily: "Roboto Medium",
//     color: "#343434",
//     marginTop: "4.6%",
//     marginLeft: "0.8%"
//   },
//   commentCard: {
//     width: "38.5%"
//   },
//   commentSub: {
//     fontSize: "14px",
//     fontFamily: "Roboto",
//     color: " #4E4B4B",
//     marginTop: "1.8%"
//   }
// });
// class CommentForm extends React.Component {
//   static propTypes = {
//     dispatch: PropTypes.func,
//   };
//   static defaultProps = {
//     dispatch: f => f,
//   };
//   constructor(props, context) {
//     super(props, context);
//     this.createComment = this.createComment.bind(this);
//   }
//   getValidationState = () => { }
//   createComment = () => {
//     const postId = this.props.postId;
//     this.props.dispatch(doComment(postId, this.comment_body.value));
//     this.comment_body.value = null;
//   }
//   render() {
//     const { open, toggleCommentDialogClose } = this.props;
//     const { classes } = this.props;
//     console.log(this.props,"comment");
//     return (
//       // <Dialog open={open}>
//         <Card >
//           <CardContent style={{width:''}}>
//             <Grid container>
//               <Grid item md={11} sm={11} xs={10}>
//                 <Typography className={classes.dialogTitle}>
//                   Comment to Vishwas Mudagal
//                 </Typography>
//               </Grid>
//               <Grid item md={1} sm={1} xs={1}>
//                 <Button
//                   className={classes.closeIcon}
//                   onClick={() => {
//                     toggleCommentDialogClose();
//                   }}
//                 >
//                   <i class="material-icons">close</i>
//                 </Button>
//               </Grid>
//             </Grid>
//             <Grid>
//             <InputBase
//               multiline
//               placeholder="Type your comment here..."
//               className={classes.InputBaseCommentForm}
//               inputRef={(ref) => { this.comment_body = ref; }}
//               required="true"
//             ></InputBase>
//             <Button className={classes.buttonCommontForm}  onClick={
//            (e) => {
//             e.preventDefault();
//              e.stopPropagation();
//              this.createComment();
//             //  this.setState({ formPosted: true });
//             }
//           }>Comment</Button>
//             </Grid>
//           </CardContent>
//         </Card>
//       // </Dialog>
//     );
//   }
// }
// // CommentForm.propTypes = {
// //   classes: PropTypes.object.isRequired
// // };
// export default connect()(withStyles(design)(CommentForm));
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import { doComment } from './CommentForm.actions';
import styles from './CommentForm.css';
import { Grid, InputBase, Button, withStyles, Typography } from '@material-ui/core';
const design = theme => ({
  avatarComment: {
    // marginTop: "3%",
    marginLeft: "1.4%",
    ["@media (max-width:360px)"]: {
      width:'30px',
      height:'30px',
      position:'relative',
      right:'10px',
    },
    ["@media (max-width:414px)"]: {
      marginRight:'1%',
      width:"25px",
      height:'25px',
      marginTop:'9%',
      marginRight:'1%',
    },
  },
  inputBaseGrid: {
    border: "1px solid #DADADA",
    borderRadius: "31px",
    width: "auto",
    height:'5vh',
    paddingLeft: '2%',
    // marginLeft: "10px",
    // marginTop: "1.8%"
    overflow:"hidden",
    marginLeft:"0%"
,
["@media (max-width:360px)"]: {
  marginLeft:'4%',
  position:'relative',
  right:'3px',
},
  },
  inputBase:{
    marginTop:"0.8%",
    fontSize:"16px",
    width:"97%",
    background:"",
  },
  dialogTitle: {
    fontSize: "18px",
    fontFamily: "Roboto Medium",
    color: "#343434",
    marginTop: "2.6%",
    marginLeft: "1.4%",
    marginBottom: "3%"
  },
  closeIcon: {
    width: "18.7px",
    height: "18.7px",
    marginTop: "1.3%",
    marginRight: "2.3%"
  },
  buttonCommontForm: {
    background: "#E74A3F",
    textTransform: "none",
    borderRadius: "18px",
    // marginTop: "20%",
    // marginLeft:"20%",
    // position: "center",
    // marginBottom: "2%",
    // width: "auto",
    // height: "auto",
    // textAlign: "center",
    // alignItems: "center",
    // display: "flex",
    margin: "auto",
  },
  buttonTypography:{
    fontSize:'14px',
    color: 'white',
    margin: "auto",
    ["@media (max-width:48em)"]: {
      fontSize:'12px'
    },
  },
  username: {
    fontSize: "16px",
    fontFamily: "Roboto Medium",
    color: "#343434",
    marginTop: "4.6%",
    marginLeft: "0.8%"
  },
  commentCard: {
    width: "38.5%"
  },
  commentSub: {
    fontSize: "14px",
    fontFamily: "Roboto",
    color: " #4E4B4B",
    marginTop: "1.8%"
  }
});
class CommentForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };
  constructor(props, context) {
    super(props, context);
    this.createComment = this.createComment.bind(this);
  }
  getValidationState = () => { }
  createComment = () => {
    const postId = this.props.postId;
    this.props.dispatch(doComment(postId, this.comment_body.value));
    this.comment_body.value = null;
  }
  render() {
    const { classes } = this.props
    console.log("comment:",this.props);
    return (
      <Grid container  style={{display:"inline-flex"}} >
        <Grid item lg={1} md={1} sm={1} xs={1} >
          <Avatar
            aria-label="Recipe"
            className={classes.avatarComment}
            src={this.props.profile.profile_image.thumb}
          ></Avatar>
        </Grid>
        <Grid item lg={9} md={9} sm={9} xs={8} className={classes.inputBaseGrid}>
          <InputBase className={classes.inputBase}
            multiline
            rowsMax="4"
            style={{}}
            type="text"
            placeholder='Write a comment...'
            inputRef={(ref) => { this.comment_body = ref; }}
            required="true">
            </InputBase>
            </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2} style={{paddingLeft:'3%',paddingTop:"0.5%"}}>
          <Button  onClick={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.createComment();
            }
          } className={classes.buttonCommontForm}>
           <Typography className={classes.buttonTypography}> Comment </Typography>
                    </Button>
        </Grid>
      </Grid>
    );
  }
}
export default connect()(withStyles(design)(CommentForm))