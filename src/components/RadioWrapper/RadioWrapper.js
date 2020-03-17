import classNames from 'classnames';
import React from 'react';
import styles from './RadioWrapper.css';

const RadioWrapper = ({ className, text, onClick = f => f, checked, tooltipContent, ...props }) => (
  <div className={className} onClick={onClick} aria-checked={checked} role={'radio'} tabIndex={0}>
    <RadioBox checked={checked} />
    {text}&nbsp;
    {/* <span className={'tooltipWrapper'}>
      <i className={classNames(styles.infoIcon, 'material-icons')}>info_outline</i>
      {tooltipContent && <span className={'tooltip'}>{tooltipContent}</span>}
    </span> */}
  </div>
);
export default RadioWrapper;

RadioWrapper.propTypes = {
  className: React.PropTypes.string,
  text: React.PropTypes.string,
  onClick: React.PropTypes.func,
  checked: React.PropTypes.bool,
  tooltipContent: React.PropTypes.string,
};

RadioWrapper.defaultProps = {
  className: '',
  text: '',
  onClick: f => f,
  checked: false,
  tooltipContent: '',
};

const RadioBox = ({ className, onClick, checked }) => (
  <span
    className={classNames(className, styles.checkboxIcon, { [styles.borderCheckbox]: checked })}
    onClick={onClick}
    role={'checkbox'}
    aria-checked={checked}
    tabIndex={0}
  >
    {checked && <span className={classNames(className, styles.checked)} />}
  </span>
);

RadioBox.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  checked: React.PropTypes.bool,
};

RadioBox.defaultProps = {
  className: '',
  onClick: f => f,
  checked: false,
};
