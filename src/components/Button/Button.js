import classNames from 'classnames';
import propTypes from 'prop-types';
import React from 'react';

const Button = ({
                  className,
                  spanClassName,
                  text,
                  onClick,
                  disabled,
                  preChildren,
                  children,
                  ...props
                }) => (
    <button
      className={classNames(className)}
      onClick={onClick || ''}
      style={{ opacity: disabled ? '0.3' : '1', cursor: disabled ? 'default' : 'pointer' }}
      disabled={disabled}
      {...props}
    >
      {preChildren}
      <span className={classNames(spanClassName)}>{text}</span>
      {children}
    </button>
  )
;

Button.defaultProps = {
  className: '',
  spanClassName: '',
  text: '',
  onClick: f => f,
  disabled: false,
};

Button.propTypes = {
  className: propTypes.string,
  spanClassName: propTypes.string,
  text: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
};

export default Button;
