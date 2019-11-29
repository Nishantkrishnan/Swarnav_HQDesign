import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Paper, Card, Dialog, DialogTitle } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  avatarComment: {
    marginTop: "3%",
    marginLeft: "1.4%",
    marginRight: "0.8%"
  },
  InputBaseCommentForm: {
    border: "1px solid #DADADA",
    borderRadius: "31px",
    width: "515px",
    marginLeft: "10px",
    marginTop: "1.8%",
    ['@media (max-width:620px)']: {

      width:'400px'
    },
    ['@media (max-width:360px)']: {

      width:'230px'
    },
    ['@media (max-width:500px)']: {

      width:'300px'
    },
  },
  dialogTitle: {

    fontSize: "18px",
    color: "#343434",
    marginTop: "2.6%",
    marginLeft: "1.4%",
    marginBottom:'3%'
  },
  closeIcon: {
    width: "18.7px",
    height: "18.7px",
    marginTop: "1.3%",
    marginRight: "2.3%"
  },
  buttonCommontForm: {
    background: "linear-gradient(90deg, #E74A3F 0%, #E95B27 100%)",
    textTransform: "none",
    borderRadius: "18px",
    marginTop: "2.4%",
    position: "center",
    marginBottom: "2%",
    width: "125px",
    height: "30px",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    margin: "auto"
  },
  username: {

    fontSize: "14px",
    color: "#343434",
    marginTop: "4.6%",
    marginLeft: "0.8%"
  },
  commentCard: {
    width: "38.5%"
  },
  commentSub: {

    fontSize: "14px",
    color: " #4E4B4B",
    marginLeft: "1.4%",
    marginRight: "2.2%",
    marginTop: "1.8%"
  }
});

class CommentForm extends React.Component {
  render() {
    const { open, toggleCommentDialogClose } = this.props;
    const { classes } = this.props;
    return (
      <Dialog open={open}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item md={11} sm={11} xs={10}>
                <Typography className={classes.dialogTitle}>
                  Comment to Vishwas Mudagal
                </Typography>
              </Grid>
              <Grid item md={1} sm={1} xs={1}>
                <Button
                  className={classes.closeIcon}
                  onClick={() => {
                    toggleCommentDialogClose();
                  }}
                >
                  <i class="material-icons">close</i>
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={1} sm={1} xs={2}>
                <Avatar
                  aria-label="Recipe"
                  className={classes.avatarComment}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcJKVr--zyOdfnj0sg3c05TIUkbO-YGvljORzs4bpNfzJpOY0Y&s"
                ></Avatar>
              </Grid>
              <Grid item md={3} sm={10} xs={10}>
                <Typography className={classes.username}>
                  Vishwas Mudugal
                </Typography>
              </Grid>
            </Grid>
            <Typography className={classes.commentSub}>
              Dear All, Sub: International Day of Yoga Celebration at
              GoodWorkLabs in association with Art of Living.
            </Typography>

            <InputBase
              multiline
              placeholder="Type your comment here..."
              className={classes.InputBaseCommentForm}
            ></InputBase>
            <Button className={classes.buttonCommontForm}>Comment</Button>
          </CardContent>
        </Card>
      </Dialog>
    );
  }
}
CommentForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentForm);
