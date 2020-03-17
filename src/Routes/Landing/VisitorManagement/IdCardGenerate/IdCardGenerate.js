import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../VisitorManage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class IdCardGenerate extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	render() {
		return(
		    <div className={styles.midContentPanel}>
		        <img src="../../../src/images/GoodWorks_CoWork-logo-sq.png" alt="GoodWorksCoWork" className={styles.logoSub} />
		        <section className={styles.formUi}>
                    <div className={styles.idCard}>
                        <h2>Visitor</h2>
                        <div className={styles.idCont}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src="../../../src/images/id-pic.jpg" alt="#" className={styles.idImg} />                           
                                </div>
                                <div className="col-sm-8">
                                    <p><span>John Doe</span></p>
                                    <p>+91-123647895</p>
                                    <p>john.doe@asdf.com</p>
                                    <p>Pixma Digital</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.idPurpose}>
                            <p>
                                <span>Purpose of visit : </span>
                                <span><strong>Meeting</strong></span>
                            </p>
                            <p>
                                <span></span>
                                <span><strong>Devid (Company Name) </strong></span>
                            </p>
                        </div> 
                    </div>
                    <button className={classNames(styles.btnGreen, styles.full)}><i className="glyphicon glyphicon-print"></i> Print</button>
                </section>
		    </div>         
		);
	}
}

export default connect()(IdCardGenerate);