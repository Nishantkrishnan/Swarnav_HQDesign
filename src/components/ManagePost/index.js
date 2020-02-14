import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  OverlayTrigger,
  Popover,
  Button,
} from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { deletePost } from './ManagePost.actions';
import styles from './ManagePost.css';
import Wrapper from '../../Routes/hoc/Wrapper';
import { withStyles } from "@material-ui/core/styles";

const design = theme => ({
  dropBtn: {
    borderColor:'white',
    border:"none",
    background:'transparent !important',

    ['@media (min-width:300px) and (max-width:375px)']: {
        marginRight:"10px",
        position: "relative",
        bottom: "4px",

  },
  ["@media (min-width:376px) and (max-width:450px)"]: {
    marginRight:"17px",

  },
  },
})
class ManagePost extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    showEditModal: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
    showEditModal: f => f,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      deleteActionTriggered: false,
    };
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost = () => {
    this.dialog.show({
      body: 'Are you sure?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          this.props.dispatch(deletePost(this.props.post.post_id));
          this.setState({
            deleteActionTriggered: true,
          });
        }),
      ],
    });
  }

  showEditModal = () => {
    this.props.showEditModal(this.props.post);
  }

  render() {
    const { classes } = this.props;
    const managePostPopOver = () => {
      return (
        <Popover id={'edit-delete-post'}>
          <div className={styles.cntManagePost}>
            <div role="button" tabIndex="0" onClick={this.deletePost} className={styles.mcItem}>
            <i class="material-icons">
        delete_outline
        </i>
              <span>Delete</span>
            </div>
            <div role="button" tabIndex="0" onClick={this.showEditModal} className={styles.mcItem}>
              <i className="glyphicon glyphicon-edit" />
              <span>Edit</span>
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
              overlay={managePostPopOver()}
            >
              <Button  className={classes.dropBtn}>
                <i class="material-icons" style={{ top: '3px' }} >
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

export default connect()(withStyles(design)(ManagePost));
