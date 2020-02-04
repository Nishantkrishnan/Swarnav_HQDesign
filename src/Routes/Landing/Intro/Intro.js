import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Intro.css';

const Intro = () => {
  return (
    <div className={classNames(styles.inner, styles.cover)}>
      {/* <h4 className={styles.coverSubHeading}>BUILD YOUR DREAM COMPANY</h4> */}
      {/* <h1 className={styles.coverHeading}>GoodWorks<strong>COWORK</strong></h1> */}
      <img className="mb-4" src="../../src/images/hq_final_white-01.svg" alt="" width="200" height="200" />
      <br />
      <br />
      <Link to="/#">
        <p className="lead">
          <a href="/#" className={classNames(styles.btnOutline, styles.btnGreen)}>EXPLORE AS A GUEST</a>
        </p>
      </Link>
      <Link to="/login">
        <p className={classNames(styles.btnOutline)}>
          SIGN IN
        </p>
      </Link>
    </div>
  );
};

export default Intro;
