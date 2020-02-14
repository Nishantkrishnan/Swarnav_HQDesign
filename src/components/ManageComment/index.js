import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  OverlayTrigger,
  Popover,
  Button,
} from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { deleteComment } from './ManageComment.actions';
import Wrapper from '../../Routes/hoc/Wrapper';
import styles from './ManageComment.css';
import { withStyles } from "@material-ui/core/styles";

const design = theme => ({
  cmntDropBtn: {
       border:'transparent  !important' ,
       borderColor:'white',
        outline: "none" ,
    ['@media (min-width:300px) and (max-width:375px)']: {
      marginRight: "22px",


  },
  ["@media (min-width:376px) and (max-width:450px)"]: {
    marginRight:"17px",
  },
  },
})

class ManageComment extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    comment: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      deleteActionTriggered: false,
    };
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment = () => {
    this.dialog.show({
      body: 'Are you sure?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          this.props.dispatch(deleteComment(this.props.comment.comment_id));
          this.setState({
            deleteActionTriggered: true,
          });
        }),
      ],
    });
  }

  render() {
    const { classes } = this.props;
    const deleteCommentPopOver = () => {
      return (
        <Popover id={'delete'}>
          <div className={styles.cntManageComment}>
            {/* <div role="button" tabIndex="0" className={classNames(styles.mcItem, styles.disabledOption)}>
              <i className="glyphicon glyphicon-pencil" />
              <span>Edit</span>
            </div> */}
            <div role="button" tabIndex="0" onClick={this.deleteComment} className={styles.mcItem}>
              <i className="glyphicon glyphicon-trash" />
              <span>Delete</span>
            </div>
          </div>
        </Popover>
      );
    };

    return (
      <Wrapper className="pull-right">
        {
          this.state.deleteActionTriggered ?
            <div className={styles.infLoad}>
              <img src={'/src/images/loader.gif'} alt="" />
            </div>
            :
            <OverlayTrigger
              trigger="focus"
              placement="bottom"
              overlay={deleteCommentPopOver()}
            >
              <Button  className={classes.cmntDropBtn}>
                <i class="material-icons"  aria-hidden="true" style={{ top: '3px' }}>
  keyboard_arrow_down
  </i>
              </Button>
            </OverlayTrigger>
        }
        <div>
          <Dialog ref={(el) => { this.dialog = el; }} />
        </div>
      </Wrapper>
    );
  }
}

export default connect()(withStyles(design)(ManageComment));
