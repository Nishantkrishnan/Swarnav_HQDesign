import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../VisitorManage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EntryForm extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	render() {
		return(
		    <div className={styles.midContentPanel}>
		        <img src="../../../src/images/GoodWorks_CoWork-logo-sq.png" alt="GoodWorksCoWork" className={styles.logoSub} />
		        <section className={styles.formUi}>
                    <label>Name : </label>
                    <input type="text" />
                    <label>Email : </label>
                    <input type="text" />
                    <label>Company Name : </label>
                    <input type="text" />
                    <label>Location : </label>
                    <input type="text" />
                    {/*<label>Purpose : </label>
                    <div className="styled-select">
                        <select name="" id="">
                            <option value="">Site Visit </option>
                            <option value="">Meeting </option>
                            <option value="">Event </option>
                        </select>
                    </div>*/}
                    <Link to="/visit_purpose"><button className={classNames(styles.btnGreen, styles.full)}>Next</button></Link>
                </section>
		    </div>         
		);
	}
}

export default connect()(EntryForm);


