import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Loader } from '../../../containers/Loader/Loader';
import styles from './UserProfile.css';
import userProfileSelector from './UserProfile.selectors';
import { fetchUserProfile, doConnect, doDisconnect } from './UserProfile.actions';
import {Grid,Card,Typography} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
const design = theme => ({
UserCard:{
  width:'66%',
  boxShadow:'none',
  
  marginLeft:'1%',background:'red',
  ["@media (max-width:48em)"]: {
    width:'95%'
  },
},
});
class UserProfile extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    userProfile: PropTypes.object,
    following: PropTypes.bool,
    profile: PropTypes.object,
  };
  static defaultProps = {
    dispatch: f => f,
    userProfile: null,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      userProfile: null,
    };

    this.doConnect = this.doConnect.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUserProfile(this.props.match.params.profileID));
  }

  componentDidMount()
  {
    document.title = "GoodWorks HQ - User Profile";
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.profileID !== nextProps.match.params.profileID) {
      this.props.dispatch(fetchUserProfile(nextProps.match.params.profileID));
    }
    this.setState({ userProfile: nextProps.userProfile });
  }

  doConnect = (profileId) => {
    this.props.dispatch(doConnect(profileId));
  }

  doDisconnect = (profileId) => {
    this.props.dispatch(doDisconnect(profileId));
  }

  decodeHtml = (html) => {
    const divElement = document.createElement('div');
    divElement.innerHTML = html;
    // handle case of empty input
    return divElement.childNodes.length === 0 ? '' : divElement.childNodes[0].nodeValue;
  }

  render() {
      const { classes } = this.props;
    if (this.state.userProfile === null || this.props.profile === null) {
      return (
        <div>
          {' '}
          <Loader />{' '}
        </div>
      );
    }
    const user = this.state.userProfile.user;
    const profileImage = this.state.userProfile.profile_image.medium;
    const currentUser = this.props.profile;
    return (
      <Card  className={classes.UserCard}>
        <div className="row">
            <div className="col-sm12">
            <div className={classNames('thumbnail', styles.profileBackground)}>
              <img className='img-circle' src={profileImage} />
              <Typography  style ={{color:'white', fontSize:'20px',fontFamily:'Roboto Medium'}}>{user.first_name} {user.last_name}</Typography>
              <Typography style ={{color:'white', fontSize:'16px',fontFamily:'Roboto '}}>{user.designation}</Typography>
              <Typography style ={{color:'white', fontSize:'16px',fontFamily:'Roboto '}}>{user.organization_name}</Typography>
              <div className={classNames('row', styles.followUnfollow)}>
                <div className="col-sm12">
                  {
                    (user.id !== currentUser.user.id) &&
                    (
                      this.props.userProfile.following ?
                        <Button className='btn-xs' bsStyle="danger" onClick={() => { this.doDisconnect(user.profile_id); }}>Unfollow</Button>
                        :
                        <Button className='btn-xs' bsStyle="" style={{background:'#fafafa',borderRadius:'10px',}} onClick={() => { this.doConnect(user.profile_id); }}>
                        <Typography  style={{color:'black',fontSize:"16px",fontFamily:'Roboto Medium'}}>Follow</Typography>
                        </Button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm12">
            <p>{this.decodeHtml(user.about_me)}</p>
          </div>
        </div>
      </Card>
    );
  }
}

export const mapStateToProps = state => userProfileSelector(state);
export default connect(mapStateToProps)(withStyles(design)(UserProfile));
