import React from 'react';
import classNames from 'classnames';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import TermsCondition from './TermsCondition/TermsCondition';
import AboutUs from './AboutUs/AboutUs';
import Login from './Login/Login';
import Intro from './Intro/Intro';
import ContactUs from './ContactUs/ContactUs';
import styles from './Landing.css';
import VisitorAuth from './VisitorManagement/VisitorAuth/VisitorAuth';
import VisitorOtp from './VisitorManagement/VisitorOtp/VisitorOtp';
import EntryForm from './VisitorManagement/EntryForm/EntryForm';
import VisitPurpose from './VisitorManagement/VisitPurpose/VisitPurpose';
import VisitReason from './VisitorManagement/VisitReason/VisitReason';
import PhotoCapture from './VisitorManagement/PhotoCapture/PhotoCapture';
import VisitTermsCondition from './VisitorManagement/VisitTermsCondition/VisitTermsCondition';
import IdCardGenerate from './VisitorManagement/IdCardGenerate/IdCardGenerate';
import Kyc from './Kyc';

const Landing = () => {
  const currentPath = window.location.pathname;
  return (
    <div className={styles.mainDiv}>
      <div className={styles.siteWrapper}>
        <div className={styles.siteWrapperInner}>
          <div className={classNames(styles.coverContainer, 'marginTopLandingPages')}>
            <div className={classNames(styles.masthead, 'clearfix')}>
              <div className={styles.inner}>
                <div className={styles.headInner}>
                  {/* <Link to="/">
                    <h3 className={styles.mastheadBrand}>
                      <img className="mb-4" src="../../src/images/GoodWorks_CoWork-logo-sq.png" alt="" width="60" height="60" />
                    </h3>
                  </Link> */}
                  <nav>
                    <ul className={classNames('nav', styles.mastheadNav)}>
                      <li className={(currentPath === '/') ? styles.active : ''}>
                        <Link to="/">Home</Link>
                      </li>
                      <li className={(currentPath === '/about_us') ? styles.active : ''}>
                        <Link to="/about_us">About Us</Link>
                      </li>
                      <li className={(currentPath === '/terms_condition') ? styles.active : ''}>
                        <Link to="/terms_condition">Terms &amp; Conditions</Link>
                      </li>
                      <li className={(currentPath === '/contact_us') ? styles.active : ''}>
                        <Link to="/contact_us">Contact Us</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/visit" component={VisitorAuth} />
              <Route path="/visitor_otp" component={VisitorOtp} />
              <Route path="/entry_form" component={EntryForm} />
              <Route path="/visit_purpose" component={VisitPurpose} />
              <Route path="/visiting_reason" component={VisitReason} />
              <Route path="/photo_capture" component={PhotoCapture} />
              <Route path="/idcard_generate" component={IdCardGenerate} />
              <Route path="/visit_terms_condition" component={VisitTermsCondition} />
              <Route path="/about_us" component={AboutUs} />
              <Route path="/terms_condition" component={TermsCondition} />
              <Route path="/contact_us" component={ContactUs} />
              <Route path="/upload/:userId" component={Kyc} />
              <Route exact path="/" component={Intro} />
              <Redirect from="/*" to="/login" />
            </Switch>

            <div className={styles.mastfoot}>
              <div className={styles.inner}>
                <p>
                  All Rights Reserved. © <a href="https://www.goodworkscowork.com/" target="_blank" rel="noopener noreferrer"> GoodWorks Spaces Pvt. Ltd.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
