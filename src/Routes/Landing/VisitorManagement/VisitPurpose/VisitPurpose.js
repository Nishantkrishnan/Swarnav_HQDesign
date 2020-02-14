import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../VisitorManage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class VisitPurpose extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	render() {
		return(
		    <div className={styles.midContentPanel}>
		        <img src="../../../src/images/GoodWorks_CoWork-logo-sq.png" alt="GoodWorksCoWork" className={styles.logoSub} />
		        <section className={styles.formUi}>
                    <label>Purpose of visit : </label>
                    <div>
                        <label className={styles.purposeRadio}>
                            <div className={styles.imageCheckbox}>
                                <input id="site-visit" name="purpose" type="radio" value="SiteVisit" checked="" />
                                <label for="site-visit">Site Visit</label>
                            </div>
                        </label>
                        <label className={styles.purposeRadio}>
                            <div className={styles.imageCheckbox}>
                                 <input id="meeting" name="purpose" type="radio" value="Meeting" checked="" />
                                <label for="meeting">Meeting</label>
                            </div>
                        </label>
                        <label className={styles.purposeRadio}>
                            <div className={styles.imageCheckbox}>
                                <input id="event" name="purpose" type="radio" value="Event" checked="" />
                                <label for="event">Event</label>
                             </div>
                         </label>
                    </div>
                    <Link to="/visiting_reason"><button className={classNames(styles.btnGreen, styles.full)}>Next</button></Link>
                </section>
		    </div>         
		);
	}
}

export default connect()(VisitPurpose);