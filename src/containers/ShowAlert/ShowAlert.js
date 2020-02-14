import { showMessageAlert } from '../MessageAlert/MessageAlert.actions';
import { logOut } from '../../Routes/Landing/Login/Login.actions';
import { store } from '../../index';

function ShowAlert(error) {

  console.log('1211131',error.response);
  

  if (!window.navigator.onLine) {
    store.dispatch(
      showMessageAlert({
        message: 'Please check your internet connection',
        visible: true,
        color: '#e53e3d',
      }),
    );
  } else if (error.response.status === 401) {
    const userToken = localStorage.getItem('coworks-accessToken-remember');
    if (userToken) {
      store.dispatch(
        logOut(userToken),
      );
    } else {
      store.dispatch(
        showMessageAlert({
          message: 'Invalid email or password.',
          visible: true,
          color: '#e53e3d',
        }),
      );
    }
  } else if (error.response.status === 422 || error.response.status === 400) {
    store.dispatch(
      showMessageAlert({
        message: error.response.data.message,
        visible: true,
        color: '#e53e3d',
      }),
    );
  } else if (error.response.status === 500 || error.response.status === 504) {
    store.dispatch(
      showMessageAlert({
        message: 'Server is presently unavailable. Please try again after some time.',
        visible: true,
        color: '#e53e3d',
      }),
    );
  } else {
    store.dispatch(
      showMessageAlert({
        message: error.message,
        visible: true,
        color: '#e53e3d',
      }),
    );
  }
}

export default ShowAlert;
