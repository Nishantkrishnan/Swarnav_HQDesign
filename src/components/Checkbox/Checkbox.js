import classNames from 'classnames';
import propTypes from 'prop-types';
import React from 'react';
import styles from './Checkbox.css';

const Checkbox = ({ className, onClick, text, checked }) =>
  (
    <span
      className={classNames(className, styles.checkboxIcon, { [styles.borderCheckbox]: !checked })}
      onClick={onClick || ''}
      role={'checkbox'}
      aria-checked={checked}
      tabIndex={0}
    >
      {checked && <span className={classNames(className, styles.checked)} />}
      {text && <span className={classNames(styles.text)}>{text}</span>}
    </span>
  );

Checkbox.defaultProps = {
  className: '',
  onClick: f => f,
  checked: false,
  text: '',
};

Checkbox.propTypes = {
  className: propTypes.string,
  onClick: propTypes.func,
  checked: propTypes.bool,
  text: propTypes.string,
};

export default Checkbox;
