import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Image,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Loader } from '../../../containers/Loader/Loader';
import styles from './Followers.css';
import { fetchFollowers } from './Followers.actions';
import followersSelector from './Followers.selectors';

class Followers extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    followers: PropTypes.object,
  };

  static defaultProps = {
    dispatch: f => f,
    followers: null,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      followers: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchFollowers());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ followers: nextProps.followers });
  }

  componentDidMount()
  {
    document.title = "GoodWorks HQ - Followers";
  }
  render() {
    const followers = this.state.followers;

    if (this.state.followers === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    return (
      <div>
        <div className="page-header">
          <h1>Followers <small>Total {followers.followers_count} People following me</small></h1>
        </div>
        <div className="row">
          {
            followers.all_followers.map((user) => {
              return (
                <div className="col-md-3 col-xs-6" key={user.profile_id}>
                  <div className="thumbnail">
                    <Link to={`/user_profile/${user.profile_id}`}>
                      <Image src={user.profile_image.medium} alt="80x80" width="80" height="80" />
                    </Link>

                    <div className="caption">
                      <Link to={`/user_profile/${user.profile_id}`}>
                        <strong><small>{user.first_name} {user.last_name}</small></strong>
                      </Link>
					  <p><small>{user.designation}</small></p>
                      <p>                        
                        <span className="glyphicon glyphicon-briefcase"></span> <small>{user.organization_name}</small>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => followersSelector(state);
export default connect(mapStateToProps)(Followers);
