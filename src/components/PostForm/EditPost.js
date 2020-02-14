import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Modal,
} from 'react-bootstrap';
import { doCreatePost } from '../../Routes/Home/Dashboard/Dashboard.actions';

class EditPost extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleUpdatePosts: PropTypes.func,
    editModalShowHide: PropTypes.bool,
    editFormPosted: PropTypes.bool,
    hideEditModal: PropTypes.func,
    editPost: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
    handleUpdatePosts: f => f,
    editModalShowHide: false,
    editFormPosted: false,
    hideEditModal: f => f,
    editPost: {},
  };

  decodeHtml = (html) => {
    const divElement = document.createElement('div');
    divElement.innerHTML = html;
    // handle case of empty input
    return divElement.childNodes.length === 0 ? '' : divElement.childNodes[0].nodeValue;
  }

  updatePost = () => {
    this.props.handleUpdatePosts(this.props.editPost.post_id, this.post_body.value);
  }

  render() {
    return (
      <div>
        <Modal show={this.props.editModalShowHide} onHide={this.props.hideEditModal}>
          <Form
            onSubmit={
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.updatePost();
              }
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup controlId="formPostUpdate" >
                <FormControl
                  componentClass="textarea"
                  inputRef={(ref) => { this.post_body = ref; }}
                  required="true"
                  defaultValue={this.decodeHtml(this.props.editPost ? this.props.editPost.post_body : '')}
                  bsClass={className('form-control', this.props.styles.editPanel)}
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              {
                this.props.editFormPosted ?
                  <Button type="submit">
                    <div className={this.props.styles.infLoad}>
                      <img src={'/src/images/loader.gif'} alt="..." />
                    </div>
                  </Button>
                  :
                  <Button type="submit" className="btn btn-primary" >Post</Button>
              }
              <Button onClick={this.props.hideEditModal}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect()(EditPost);
