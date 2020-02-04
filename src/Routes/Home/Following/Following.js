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
import styles from './Following.css';
import { fetchFollowing } from './Following.actions';
import followingSelector from './Following.selectors';

class Following extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    following: PropTypes.object,
  };

  static defaultProps = {
    dispatch: f => f,
    following: null,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      following: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchFollowing());
  }

  componentDidMount()
  {
    document.title = "GoodWorks HQ - Following";
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ following: nextProps.following });
  }

  render() {
    const following = this.state.following;

    if (this.state.following === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    return (
      <div>
        {this.props.header !== 'leftPanel' &&
          <div className="page-header">
            <h1>Following <small>Total {following.following_count} People I am following</small></h1>
          </div>
        }
        <div className="row">
          {
            following.all_following.map((user) => {
              return (
                <div className="col-md-3 col-xs-6" key={user.profile_id}>
                  <div className="thumbnail">
                    <Link to={`/user_profile/${user.profile_id}`}>
                      <Image src={user.profile_image.medium} title={user.first_name+' '+user.last_name} alt="80x80" width="80" height="80" />
                    </Link>

                    {this.props.additionalInfo !== 'false' &&
                      <div className="caption">
                        <Link to={`/user_profile/${user.profile_id}`}>
                          <strong><small>{user.first_name} {user.last_name}</small></strong>
                        </Link>
                        <p><small>{user.designation}</small></p>
                        <p><span className="glyphicon glyphicon-briefcase"></span> <small>{user.organization_name}</small></p>
                      </div>
                    }
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

export const mapStateToProps = state => followingSelector(state);
export default connect(mapStateToProps)(Following);
