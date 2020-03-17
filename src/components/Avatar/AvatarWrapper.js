/**
 * Created by Swetha on 23/11/17.
 */

import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';
import styles from './AvatarWrapper.css';

const AvatarWrapper = ({ avatarUrl, avatarName, avatarClicked }) =>
  (<div className={styles.avatarWrapper}>
    <Avatar avatarUrl={avatarUrl} />
    <AvatarName avatarName={avatarName} />
    <span
      className={classNames(styles.dropdownIcon, { [styles.active]: avatarClicked })}
    />
  </div>);

AvatarWrapper.defaultProps = {
  avatarUrl: '',
  avatarName: '',
  avatarClicked: false,
};

AvatarWrapper.propTypes = {
  avatarUrl: propTypes.string,
  avatarName: propTypes.string,
  avatarClicked: propTypes.bool,
};

export default AvatarWrapper;


const AvatarName = ({ avatarName }) =>
  (<span className={styles.profName}>
    {avatarName}
  </span>);

AvatarName.defaultProps = {
  avatarName: '',
};

AvatarName.propTypes = {
  avatarName: propTypes.string,
};

const Avatar = ({ avatarUrl, avatarName }) =>
  (<span className={styles.profPic}>
    <img src={avatarUrl} alt={avatarName} />
  </span>);

Avatar.defaultProps = {
  avatarName: '',
  avatarUrl: '',
};

Avatar.propTypes = {
  avatarName: propTypes.string,
  avatarUrl: propTypes.string,
};
