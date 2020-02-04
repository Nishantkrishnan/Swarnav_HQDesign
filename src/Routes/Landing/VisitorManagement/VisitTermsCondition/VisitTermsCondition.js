import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../VisitorManage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class VisitTermsCondition extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	render() {
		return(
		    <div className={styles.midContentPanel}>
		        <img src="../../../src/images/GoodWorks_CoWork-logo-sq.png" alt="GoodWorksCoWork" className={styles.logoSub} />
		        <section className={styles.formUi}>
                    <div className={styles.terms}>
                        <ul>
                            <li><span>1</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li><span>2</span>Maecenas hendrerit risus in ornare mollis.</li>
                            <li><span>3</span>Mauris tempor dui vel ipsum eleifend, ut sodales ex feugiat.</li>
                            <li><span>4</span>Phasellus varius orci id bibendum varius.</li>
                            <li><span>5</span>Mauris eleifend ex et mi porttitor vulputate.</li>
                            <li><span>6</span>Nullam vulputate orci eu quam aliquet, non condimentum velit consequat.</li>
                            <li><span>7</span>Pellentesque in nisl nec risus mattis posuere.</li>
                            <li><span>8</span>Nunc tempor dui sit amet sagittis interdum.</li>
                            <li><span>9</span>Pellentesque sollicitudin urna sit amet justo mattis, quis scelerisque tortor luctus.</li>
                        </ul>
                        <div className={styles.signature}></div>
                        <label>
                            <div className={styles.imageCheckbox}>
                                <input id="terms-accept" name="filter-buy-lease" type="checkbox" value="terms" checked="" />
                                <label for="terms-accept"></label>
                                <span>I accept terms and condition </span>
                            </div>
                        </label>  
                    </div>
                    <Link to="/idcard_generate"><button className={classNames(styles.btnGreen, styles.full)}>Next</button></Link>
                </section>
		    </div>         
		);
	}
}

export default connect()(VisitTermsCondition);