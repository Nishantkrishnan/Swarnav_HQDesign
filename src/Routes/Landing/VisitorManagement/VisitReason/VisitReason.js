import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../VisitorManage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class VisitReason extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	render() {
		return(
		    <div className={styles.midContentPanel}>
		        <img src="../../../src/images/GoodWorks_CoWork-logo-sq.png" alt="GoodWorksCoWork" className={styles.logoSub} />
		        <section className={styles.formUi}>
                    <label>What are your requirements? </label>
                    <textarea></textarea>
                    <label>For how many seaters? </label>
                    <input type="text" />
                    <label>From where did you come to know about us? </label>
                    <input type="text" />
                    <Link to="/photo_capture"><button className={classNames(styles.btnGreen, styles.full)}>Next</button></Link>
                </section>
		    </div>         
		);
	}
}

export default connect()(VisitReason);