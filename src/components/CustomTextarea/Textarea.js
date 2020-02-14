import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import styles from './Textarea.css';

export default class Textarea extends React.Component {
 static propTypes = {
    className: PropTypes.string,
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
      className,
      placeHolder,
      value,
      error,
      message,
      ref,
      style,
      onChange,
      label,
      disabled,
      readonly,
      onBlur,
    } = this.props;

    return (
      <div ref={ref} className={classNames(styles.inputWrapper)}>
        <label>{label}</label>
        <textarea
          ref={ref => (this.referenceTextAreaNode = ref)}
          className={classNames(className, error && styles.inputError, styles.textarea,{
            [styles.disabled]: disabled,
          })}
          value={value}
          onBlur={event => onBlur(event, this.referenceTextAreaNode.value)}
          onChange={event => onChange(event, this.referenceTextAreaNode.value)}
          placeholder={placeHolder}
          style={style}
          readOnly={readonly}
        />
        {error && message && <label className={classNames(styles.message)}>{message}</label>}
      </div>
    );
  }
}
