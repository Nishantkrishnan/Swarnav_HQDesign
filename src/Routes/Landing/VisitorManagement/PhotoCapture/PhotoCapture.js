import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../VisitorManage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PhotoCapture extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	render() {
		return(
		    <div className={styles.midContentPanel}>
		        <img src="../../../src/images/GoodWorks_CoWork-logo-sq.png" alt="GoodWorksCoWork" className={styles.logoSub} />
		        <section className={styles.formUi}>
                    <div className={styles.captureImage}>
                    </div>
                    <Link to="/visit_terms_condition"><button className={classNames(styles.btnGreen, styles.full)}><i className={classNames(styles.glyphicon, styles.glyphiconCamera)}></i> Capture</button></Link>
                </section>
		    </div>         
		);
	}
}

export default connect()(PhotoCapture);