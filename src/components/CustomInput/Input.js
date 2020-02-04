import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Input.css';

class Input extends Component {
 static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    style: PropTypes.instanceOf(Object),
    message: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.bool,
    label: PropTypes.string,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    type: '',
    style: {},
    className: '',
    value: undefined,
    error: false,
    disabled: false,
    readonly: false,
    placeHolder: '',
    message: '',
    label: '',
    onChange: f => f,
    onBlur: f => f,
  };

  constructor() {
    super();
  }
  render() {
    const {
      type,
      className,
      placeHolder,
      value,
      style,
      error,
      message,
      onChange,
      onBlur,
      label,
      ref,
      disabled,
      readonly,
    } = this.props;

    return (
      <div ref={ref} className={classNames(styles.inputWrapper)}>
        <label>{label}</label>
        <input
          type={type || 'text'}
          value={value}
          ref={ref => (this.referenceNode = ref)}
          className={classNames(className,styles.inputField, error && styles.inputError,{
            [styles.disabled]: disabled,
          })}
          onBlur={event => onBlur(event, this.referenceNode.value)}
          onChange={event => onChange(event, this.referenceNode.value)}
          placeholder={placeHolder}
          style={style}
          readOnly={readonly}
        />
        {error && message && <label className={classNames(styles.message)}>{message}</label>}
      </div>
    );
  }
}

export default Input;
