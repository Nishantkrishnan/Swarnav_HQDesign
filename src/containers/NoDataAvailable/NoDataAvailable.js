import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Col,
  Row,
} from 'react-bootstrap';

class NoDataAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: props.msg,
    };
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <div className="containerWrapper">
            <div className="divWrapper">
              <div className="tx">
                <h3 className="text-muted">{this.state.msg}</h3>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default NoDataAvailable;

// Validation
NoDataAvailable.propTypes = {
  msg: PropTypes.string.isRequired,
};