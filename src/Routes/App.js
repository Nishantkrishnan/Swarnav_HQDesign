import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Landing from './Landing/Landing';
import Home from './Home';
import MessageAlert from '../containers/MessageAlert/MessageAlert';
import '../global.css';

class App extends React.Component {

  render() {
    const { showMessageAlert }  = this.props;
    const sessionToken = localStorage.getItem('coworks-accessToken-remember');
    
    return (
      <div>
        {
          showMessageAlert && <MessageAlert />
        }
        {
          sessionToken ? <Home /> : <Landing />
        }
      </div>
    );
  }
}

App.propTypes = {
  showMessageAlert: PropTypes.bool.isRequired,
  isLoggedin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  showMessageAlert: state.messageAlert.get('visible'),
  isLoggedin: state.login.get('loggedIn'),
});

export default withRouter(connect(mapStateToProps)(App));
