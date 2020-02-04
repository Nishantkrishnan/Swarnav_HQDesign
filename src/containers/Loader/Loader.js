import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Loader.css';
import { loaderSelector } from './Loader.selector';

export class Loader extends Component {
  render() {
    return (
      <div className={styles.overlay}>
        <div className={styles.loaderImage} />
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return { ...loaderSelector(state) };
}

export default connect(mapStateToProps)(Loader);
