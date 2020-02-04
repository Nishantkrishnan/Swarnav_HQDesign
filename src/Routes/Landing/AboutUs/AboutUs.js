import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import aboutUsSelector from './AboutUs.selectors';
import { fetchAboutUs } from './AboutUs.actions';
import { Loader } from '../../../containers/Loader/Loader';
import styles from './AboutUs.css';

class AboutUs extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    aboutUs: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
    aboutUs: null,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      services: {},
      aboutUs: props.aboutUs,
      serviceTypeIndex: 0,
      individualCategory: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchAboutUs());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ aboutUs: nextProps.aboutUs });
  }

  destroySession = () => {
    localStorage.clear();
  }

  render() {
    if (this.state.aboutUs === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    return (
      <div className="textAlignLeft" dangerouslySetInnerHTML={{ __html: this.state.aboutUs.page_content }}></div>
    );
  }
}
export const mapStateToProps = state => aboutUsSelector(state);
export default connect(mapStateToProps)(AboutUs);
