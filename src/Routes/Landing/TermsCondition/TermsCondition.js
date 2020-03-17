import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import termsConditionSelector from './TermsCondition.selectors';
import { fetchTermsCondition } from './TermsCondition.actions';
import { Loader } from '../../../containers/Loader/Loader';
import styles from './TermsCondition.css';

class TermsCondition extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };
  static defaultProps = {
    dispatch: f => f,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      services: {},
      termsCondition: props.termsCondition,
      serviceTypeIndex: 0,
      individualCategory: false,
    };
  }

  componentDidMount = () => {
    this.props.dispatch(fetchTermsCondition());
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ termsCondition: nextProps.termsCondition });
  }

  destroySession = () => {
    localStorage.clear();
  }

  render() {
    if (this.state.termsCondition === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    return (
      <div className="textAlignLeft" dangerouslySetInnerHTML={{ __html: this.state.termsCondition.page_content }}></div>
    );
  }
}
export const mapStateToProps = state => termsConditionSelector(state);
export default connect(mapStateToProps)(TermsCondition);
