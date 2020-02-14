import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { hideMessageAlert } from './MessageAlert.actions';
import styles from './MessageAlert.css';
import { messageAlertSelector } from './MessageAlert.selector';

export class MessageAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closeErrorMsg: true,
    };
    this.hide = this.hide.bind(this);
    this.closeMessageAlertListener = this.closeMessageAlertListener.bind(this);
  }

  componentWillMount() {
    /* start listening to escape key press to close the MessageAlert box */
    document.addEventListener('keydown', this.closeMessageAlertListener);
  }

  componentDidMount() {
    if (this.props.hasClose) {
      setTimeout(() => this.props.dispatch(hideMessageAlert()), 5000);
    }
  }

  componentWillUnmount() {
    /* stop listening to escape key press after closing the MessageAlert  box */
    document.removeEventListener('keypress', this.closeMessageAlertListener);
  }

  hide() {
    this.props.dispatch(hideMessageAlert());
  }

  closeMessageAlertListener(e) {
    if (e.keyCode === 27) {
      this.hide();
    }
  }

  render() {
    const { message, className, color, errors, hasClose } = this.props;
    const alertType = {
      backgroundColor: color,
    };
    const type = color === '#e53e3d' ? 'Error:' : 'Success:';
    return (
      <div>
        {this.state.closeErrorMsg && (
          <div className={classNames(styles.msgWrapper, className)} style={alertType}>
            <i className={classNames(styles.exclamationIcon, 'material-icons', 'fLeft')}>error</i>
            <span className={classNames(styles.msg, 'fLeft')}>
              {message}
              {errors}
            </span>
            {
              hasClose &&
                <i className={classNames(styles.closeIcon, 'material-icons')} onClick={this.hide}>
                  highlight_off
                </i>
            }
          </div>
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => messageAlertSelector(state);

export default connect(mapStateToProps)(MessageAlert);

MessageAlert.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
