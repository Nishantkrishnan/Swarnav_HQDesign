import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Input.css';

class Input extends Component {
  /*
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onBlur: PropTypes.func,
    message: PropTypes.string,
    style: PropTypes.instanceOf(Object),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    onFocus: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.bool,
    wrapperClass: PropTypes.string,
    label: PropTypes.string,
    readonly: PropTypes.bool,
  };
  static defaultProps = {
    type: '',
    style: {},
    className: '',
    defaultValue: undefined,
    value: undefined,
    error: false,
    maxLength: undefined,
    disabled: false,
    placeHolder: '',
    message: '',
    wrapperClass: '',
    label: '',
    readonly: false,
    onChange: f => f,
    onFocus: f => f,
    onBlur: f => f,
    onClick: f => f,
    onKeyDown: f => f,
    onEnter: f => f,
  };
  */
  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    if (event.keyCode === 13 && this.props.onEnter) {
      event.preventDefault();
      this.props.onEnter(event.target.value);
    }
  }

  render() {
    const {
      type,
      className,
      placeHolder,
      defaultValue,
      value,
      error,
      message,
      maxLength,
      wrapperClass,
      ref,
      style,
      onBlur,
      onClick,
      onChange,
      label,
      disabled,
      readonly,
    } = this.props;

    return (
      <div ref={ref} className={classNames(styles.inputWrapper, wrapperClass)}>
        <label className={styles.inputLabel}>{label}</label>
        <input
          type={type || 'text'}
          ref={ref => (this.referenceNode = ref)}
          className={classNames(className,styles.inputField, error && styles.inputError, {
            [styles.disabled]: disabled,
          })}
          value={value}
          onKeyUp={this.onKeyDown}
          onBlur={(event) => { onBlur ? onBlur(event, this.referenceNode.value) : null }}
          onChange={event => onChange(event, this.referenceNode.value)}
          placeholder={placeHolder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          style={style}
          readOnly={readonly}
          onClick={event => { onClick ? onClick(event, this.referenceNode.value, this.referenceNode.checked) : null }}
        />
        {error && <span className={classNames(styles.error)} />}

        {error && message && <label className={classNames(styles.message)}>{message}</label>}
      </div>
    );
  }
}

export default Input;
