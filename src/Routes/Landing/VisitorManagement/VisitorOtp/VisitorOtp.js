import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../VisitorManage.css';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class VisitorOtp extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	render() {
		return(
			<div className={styles.midContentPanel}>
               	<img src="../../../src/images/cowork-logo.png" alt="GoodWorksCoWork" className={styles.logoSub} />
               	<section>
                   	<p className={styles.otpText}>Please enter OTP sent to - <strong>9999999999</strong></p>
                   	<div className={styles.mobBox}>
                       	<span className={classNames(styles.phNo, styles.otp)}>-</span>
                       	<span className={classNames(styles.phNo, styles.otp)}>-</span>
                       	<span className={classNames(styles.phNo, styles.otp)}>-</span>
                       	<span className={classNames(styles.phNo, styles.otp)}>-</span>
                   	</div>
                   	<div className={styles.numberPad}>
                       	<ul>
                           	<li><button>1</button></li>
                           	<li><button>2</button></li>
                           	<li><button>3</button></li>
                           	<li><button>4</button></li>
                           	<li><button>5</button></li>
                           	<li><button>6</button></li>
                           	<li><button>7</button></li>
                           	<li><button>8</button></li>
                           	<li><button>9</button></li>
                           	<li><button className={styles.icon}><img src="../../../src/images/backspace.png" alt="" /></button></li>
                           	<li><button>0</button></li>
                           	<li><Link to="/entry_form"><button className={styles.icon}><img src="../../../src/images/tick.png" alt="" /></button></Link></li>
                       	</ul>
                   	</div>
               	</section>
           	</div>
		);
	}
}

export default connect()(VisitorOtp);