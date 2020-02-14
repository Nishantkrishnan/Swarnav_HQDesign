import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import styles from '../Input/Input.css';

export default class Textarea extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onBlur: PropTypes.func,
    message: PropTypes.string,
    style: PropTypes.instanceOf(Object),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.bool,
    wrapperClass: PropTypes.string,
    label: PropTypes.string,
    maxlength: PropTypes.number,
  };
  static defaultProps = {
    style: {},
    className: '',
    defaultValue: undefined,
    value: undefined,
    error: false,
    disabled: false,
    placeHolder: '',
    message: '',
    wrapperClass: '',
    label: '',
    onChange: f => f,
    onBlur: f => f,
    onClick: f => f,
    onKeyDown: f => f,
    onEnter: f => f,
    maxlength: undefined,
  };

  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    if (event.keyCode === 13 && this.props.onEnter) {
      this.props.onEnter(event.target.value);
    }
  }

  render() {
    const {
      className,
      placeHolder,
      defaultValue,
      value,
      error,
      message,
      wrapperClass,
      ref,
      style,
      onBlur,
      onClick,
      onChange,
      label,
      disabled,
      maxlength,
    } = this.props;

    return (
      <div ref={ref} className={classNames(styles.inputWrapper, wrapperClass)}>
        <label className={styles.inputLabel} htmlFor={label}>
          {label}
        </label>
        <textarea
          ref={ref => (this.referenceTextAreaNode = ref)}
          className={classNames(className, error && styles.inputError, styles.textarea, {
            [styles.disabled]: disabled,
          })}
          value={value}
          onKeyDown={event => this.onKeyDown(event)}
          onBlur={event => onBlur(event, this.referenceTextAreaNode.value)}
          onChange={event => onChange(event, this.referenceTextAreaNode.value)}
          placeholder={placeHolder}
          defaultValue={defaultValue}
          maxLength={maxlength}
          style={style}
          onClick={event =>
            onClick(event, this.referenceTextAreaNode.value, this.referenceTextAreaNode.checked)
          }
        />
        {error && <span className={classNames(styles.error)} />}

        {error && message && <label className={classNames(styles.message)}>{message}</label>}
      </div>
    );
  }
}
